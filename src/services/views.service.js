import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";

class ViewsServices {
  getProducts = async (query) => {
    const products = await productsManager.getProducts(query);
    return products;
  };

  getCartById = async (id) => {
    const response = await cartManager.findById(id);
    return response;
  };

  findMessages = async (cid) => {
    const response = await chatManager.getMessages(cid);
    return response;
  };
}

export const viewsServices = new ViewsServices();
