import { productsServices } from "../services/products.service.js";
import socketServer from "../app.js";
import CustomError from "../errors/CustomError.js";
import { errorMessagges } from "../errors/error.enum.js";
class ProductsController {
    
    async allProducts (req,res){
        try {
            const products = await productsServices.getProducts(req.query);
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({message: error})
        }
    };

    async getProductById (req,res) {
        const {pid} = req.params;
        try {
            const product = await productsServices.findProduct(pid);
            if(!product) return res.status(400).json({mesagge: `There is no product with ID ${pid}`});
            res.status(200).json({product})
        } catch (error) {
            CustomError.createError(errorMessagges.PRODUCT_NOT_FOUND);
        }
    };

    async createNewProduct (req,res) {
        try {
            const product = await productsServices.newProduct({product:req.body,id:req.session.passport.user});
            // Se envia un objeto con las propiedades del nuevo producto y ademas el id del usuario que lo creó.
            const response = await productsServices.getProducts({limit:200});
            const products = response.payload.map(prod => ({ ...prod}));
            socketServer.emit('datos', products);
            res.status(200).json({message: 'Create product',product});
        } catch (error) {
            CustomError.createError(errorMessagges.PRODUCT_NOT_CREATED);
        }
    };

    async editProduct (req,res) {
        const {pid} = req.params;
        try {
            const product = await productsServices.updateProduct(pid,req.body,req.session.passport.user);
            if(!product){
                return res.status(400).json({message:'You are not authorized because you have not been the creator of the product.'});
            }
            res.status(200).json({message: 'Update product', 'Product': {...product._doc,...req.body}});
    //       // Esto lo que hace es mostrar el producto actualizado como respuesta ya que el metodo utilizado en el manager
    //       // retorna el producto antes de ser actualizado.
        } catch (error) {
            res.status(500).json({mesagge: error})
        }
    };

    async deleteOneProduct (req, res) {
        const {pid} = req.params;
        try {
          const response = await productsServices.deleteProduct(pid,req.session.passport.user);
          if(!response){
            return res.status(400).json({message:'You are not authorized because you have not been the creator of the product.'});
          }
          const respuesta = await productsServices.getProducts({limit:200});
          const products = respuesta.payload.map(product => ({ ...product}));
          socketServer.emit('eliminar', products);
          res.status(200).json({message: 'Delete product', response});
        } catch (error) {
          res.status(500).json({error});
        }
    };
};

export const productsController = new ProductsController();


