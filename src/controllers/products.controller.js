import { productsServices } from "../services/products.service.js";
import socketServer from "../app.js";
import CustomError from "../errors/CustomError.js";
import { errorMessagges } from "../errors/error.enum.js";
import { __dirname } from "../utils.js";
import fs from "fs";
import { transporter } from "../nodemailer/nodemailer.js";

class ProductsController {
  async allProducts(req, res) {
    try {
      const products = await productsServices.getProducts(req.query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsServices.findProduct(pid);
      if (!product)
        return res
          .status(400)
          .json({ mesagge: `There is no product with ID ${pid}` });
      res.status(200).json({ product });
    } catch (error) {
      CustomError.createError(errorMessagges.PRODUCT_NOT_FOUND);
      //     res.status(500).json({message:error})
    }
  }

  async createNewProduct(req, res) {
    try {
      if (req.file) {
        await productsServices.newProduct({
          product: req.body,
          id: req.session.passport.user,
          originalname: req.file.originalname,
        });
        // Se envia un objeto con las propiedades del nuevo producto y ademas el id del usuario que lo creó.
        const newPath = `${__dirname}/public/images/${req.file.originalname}`;
        fs.renameSync(req.file.path, newPath);
      } else {
        await productsServices.newProduct({
          product: req.body,
          id: req.session.passport.user,
        });
      }
      const response = await productsServices.getProducts({ limit: 200 });
      const products = response.payload.map((prod) => ({ ...prod }));
      socketServer.emit("datos", products);
      res.status(200).json({ message: "Create product", product });
    } catch (error) {
      // CustomError.createError(errorMessagges.PRODUCT_NOT_CREATED);
      res.status(500).json({ message: error });
    }
  }

  async editProduct(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsServices.updateProduct(
        pid,
        req.body,
        req.session.passport.user
      );
      if (!product) {
        return res.status(400).json({
          message:
            "You are not authorized because you have not been the creator of the product.",
        });
      }
      res.status(200).json({
        message: "Update product",
        Product: { ...product._doc, ...req.body },
      });
      //       // Esto lo que hace es mostrar el producto actualizado como respuesta ya que el metodo utilizado en el manager
      //       // retorna el producto antes de ser actualizado.
    } catch (error) {
      res.status(500).json({ mesagge: error });
    }
  }

  async deleteOneProduct(req, res) {
    const { pid } = req.params;
    try {
      const response = await productsServices.deleteProduct(pid,req.session.passport.user);
      if (!response.productDeleted) {
        return res.status(400).json({
          message:
            "You are not authorized because you have not been the creator of the product.",
        });
      }
      const respuesta = await productsServices.getProducts({ limit: 200 });
      const products = respuesta.payload.map((product) => ({ ...product }));
      socketServer.emit("eliminar", products);
      if (response.emailUser) {
        const messageOptions = {
          from: "Hector Atencio",
          to: response.emailUser,
          subject: "Producto eliminado",
          html: `
                  <h2>Su producto ${response.productDeleted.title} a sido eliminado de la app e-commers del curso de coderhouse, 
                  si usted no lo ha eliminado ha sido eliminado por un administrador.</h2>`,
        };
        await transporter.sendMail(messageOptions);
      }
      res.status(200).json({ message: "Delete product", response });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export const productsController = new ProductsController();
