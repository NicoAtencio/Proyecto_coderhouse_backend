import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";

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

  findMessages = async (cid) => {
    try {
      const response = await chatManager.getMessages(cid);
      return response;
    } catch (error) {
      throw error.message;
    }
  }
}

export const viewsServices = new ViewsServices();
