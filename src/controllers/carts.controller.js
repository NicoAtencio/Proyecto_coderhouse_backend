import { cartServices } from "../services/carts.service.js";

class CartsControllers {
  async getCarts(req, res) {
    try {
      const carts = await cartServices.allCarts();
      res.status(200).json({ message: "All carts", carts });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getById(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartServices.getCart(cid);
      if (!cart) return res.status(400).json(`No cart exist witch ID ${cid}`);
      res.status(200).json({ message: "Cart", cart });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createCart(req, res) {
    try {
      const cart = await cartServices.newCart();
      res.status(200).json({ message: "Created cart", cart });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async updateCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartServices.addOrIncrement(cid, pid);
      res.status(200).json({ message: "Cart modified", cart });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async deleteAProduct(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartServices.getProductAndDelete(cid, pid);
      if (!cart)
        return res.status(500).json({ message: "Some data is missing" });
      res.status(200).json({ message: "Deleted product", cart });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async emptyCart(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartServices.removeProductsFromCart(cid);
      if (!cart)
        return res.status(500).json({ message: "Some data is missing" });
      res.status(200).json({ message: "Deleted products", cart });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async modifyQuantity(req, res) {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    try {
      const productQuantity = await cartServices.newQuantity(cid, pid, quantity);
      res.status(200).json(productQuantity);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async processPurchase(req, res) {
    const { cid } = req.params;
    try {
      const userId = req.session.passport.user;
      const response = await cartServices.completePurchase(cid, userId);
      // Envio el id del usuario para que el service se encargue de obtener el email y agregarlo al ticket.
      res.cookie("data", response);
      res.status(200).json({ message: "Successful purchase", response });
      // res.redirect('/pay');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const cartsController = new CartsControllers();
