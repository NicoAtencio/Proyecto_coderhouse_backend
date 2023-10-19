import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";

class ViewsServices {
    
  getProducts = async (query) => {
    try {
      const products = await productsManager.getProducts(query);
      return products;
    } catch (error) {
      return error;
    }
  };

  getCartById = async (id) => {
    try {
      const response = await cartManager.findById(id);
      return response;
    } catch (error) {
      throw error.message;
    }
  }
}

export const viewsServices = new ViewsServices();
