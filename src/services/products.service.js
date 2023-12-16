import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import { sessionManager } from "../DAL/DAOs/MongoDAOs/managers/SessionManager.mongo.js";
import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";
import fs from "fs";
import { __dirname } from "../utils.js";
import { dirname } from "path";

class ProductsServices {
  async getProducts(query) {
    return await productsManager.getProducts(query);
  }

  async findProduct(id) {
    const product = await productsManager.findById(id);
    return product;
  }

  async newProduct(obj) {
    const user = await sessionManager.findById(obj.id);
    if (obj.originalname) {
      if (user.role === "premium") {
        return await productsManager.createOne({
          ...obj.product,
          owner: obj.id,
          thumbnails: obj.originalname,
        });
      } else {
        const newProduct = await productsManager.createOne({
          ...obj.product,
          thumbnails: obj.originalname,
        });
        return newProduct;
      }
    }

    if (user.role === "premium") {
      return await productsManager.createOne({
        ...obj.product,
        owner: obj.id,
      });
    };

    const newProduct = await productsManager.createOne(obj.product);
    return newProduct;
  }

  async updateProduct(pid, obj, uid) {
    const user = await sessionManager.findById(uid);

    if (user.role === "premium") {
      const product = await productsManager.findById(pid);

      if (product.owner == uid) {
        return await productsManager.updateOne(pid, obj);
      } else {
        return false;
      }
    };
    
    return await productsManager.updateOne(pid, obj);
  }

  deleteProduct = async (pid, uid) => {
    const user = await sessionManager.findById(uid);
    const product = await productsManager.findById(pid);

    // En caso de ser un usuario premium quien quiere eliminar el producto se corrobora que sea el producto de su creación.
    if (user.role === "premium") {
      if (product.owner == uid) {
        const productDeleted = await productsManager.deleteOne(pid);
        const email = user.email;
        if (product.thumbnails) {
          fs.unlinkSync(`${__dirname}/public/images/${product.thumbnails}`);
        }
        return { productDeleted, emailUser: email };
      } else {
        return false;
      }
    }

    // En caso de que sea un admin el que elimina el producto se verifica si fue un premium quien creó el producto, para notificarle
    // que su producto fue eliminado por un admin.
    if (product.owner) {
      const productDeleted = await productsManager.deleteOne(pid);
      const productCreator = await userManager.findById(product.owner);
      if (product.thumbnails) {
        fs.unlinkSync(`${__dirname}/public/images/${product.thumbnails}`);
      }
      return { productDeleted, emailUser: productCreator.email };
    }

    if (product.thumbnails) {
      fs.unlinkSync(`${__dirname}/public/images/${product.thumbnails}`);
    }

    const productDeleted = await productsManager.deleteOne(pid);
    return { productDeleted, emailUser: false };
  };
}

export const productsServices = new ProductsServices();
