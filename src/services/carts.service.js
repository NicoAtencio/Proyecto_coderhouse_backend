import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import { ticketManager } from "../DAL/DAOs/MongoDAOs/managers/TickectManager.js";
import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";

class CartServices {
  async allCarts() {
    const result = await cartManager.findAll();
    return result;
  }

  async getCart(id) {
    const result = await cartManager.findById(id);
    return result;
  }

  async newCart() {
    const result = await cartManager.createOne();
    return result;
  }

  async addOrIncrement(cid, pid) {
    const result = await cartManager.insertProductOrIncreaseQuantity(cid, pid);
    return result;
  }

  async getProductAndDelete(cid, pid) {
    const result = cartManager.deleteProduct(cid, pid);
    return result;
  }

  async removeProductsFromCart(cid) {
    const cart = await cartManager.deleteProducts(cid);
    return cart;
  }

  async newQuantity(cid, pid, quantity) {
    const productQuantity = await cartManager.updateQuantity(cid,pid,quantity);
    return productQuantity;
  }

  async subtractQuantity(cid, pid) {
    const product = await cartManager.subtractProduct(cid, pid);
    return product;
  }

  async completePurchase(cid, userId) {
    const cart = await cartManager.findById(cid);
    const dataProducts = [];
    let priceProducts = [];

    for (const element of cart["products"]) {
      const pid = element["product"]["_id"].toHexString();
      // Obtengo el id del producto
      const product = await productsManager.findById(pid);
      const stock = product.stock;
      // Obtengo cuanto es el stock actual del producto

      if (element.quantity <= stock) {
        dataProducts.push(element);
        priceProducts.push(element.product.price * element.quantity);
        await productsManager.updateOne(pid, {
          stock: stock - element.quantity,
        });
        priceProducts.push(product.price * element.quantity);
        // Agrego al arreglo el total de la venta de cada producto para luego sumarlos.
        await cartManager.deleteProduct(cid, pid);
        // Se elimina el producto comprado del carro.
      };

    };

    if (dataProducts) {
      const total = priceProducts.reduce((tot, num) => tot + num, 0);
      const user = await userManager.findById(userId);
      const email = user.email;
      await ticketManager.createOne({ amount: total, purchaser: email });
    };

    return dataProducts;
  }
}

export const cartServices = new CartServices();
