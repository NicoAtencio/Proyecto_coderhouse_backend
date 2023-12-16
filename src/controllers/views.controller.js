import { viewsServices } from "../services/views.service.js";

class ViewsController {
  products = async (req, res) => {
    const response = await viewsServices.getProducts(req.query);
    const { username } = req.query;
    const products = response.payload.map((product) => ({ ...product }));
    // Hace un objeto sin prototipo para poder usarlo en la vista products.handlebars
    if (username) {
      res.render("products", {
        products,
        username: { username: username, value: true },
      });
    } else {
      res.render("products", { products });
    }
  };

  realTime = async (req, res) => {
    try {
      const respuesta = await viewsServices.getProducts(req.query);
      const products = respuesta.payload.map((product) => ({ ...product }));
      res.render("realTimeProducts", { products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  processPurchaseData(req, res) {
    try {
      const data = req.cookies.data;
      data.forEach(product => {
        product.total = product.product.price * product.quantity;
      });
      const totales = data.map(pro => pro.total);
      const total = totales.reduce((acumulater,currentValue) => {
        return acumulater + currentValue
      }, 0);
      res.render("confirmPayment", { data:data,total:total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getCart = async (req, res) => {
    const { cid } = req.params;
    try {
      const response = await viewsServices.getCartById(cid);
      const products = response.products;
      const nuevo = products.map((p) => ({
        id: p._id,
        product: p.product.title,
        description: p.product.description,
        price: p.product.price,
        quantity: p.quantity,
      }));
      // Cambiar la vista para que se vea bien
      res.render("cartId", { nuevo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getMessages = async (req, res) => {
    try {
      const response = await viewsServices.findMessages(
        "64f0f89bcccc069ea5c3eb38"
      );
      const message = response.messages.map((r) => ({
        user: r.user,
        message: r.message,
      }));
      res.render("chat", { message });
    } catch (error) {
      return error;
    }
  };

  getUsers = async (req,res) => {
    res.render("users")
  }

  login = (req, res) => {
    const { username } = req.query;
    if (username) {
      res.render("login", { username, value: true });
    } else {
      res.render("login");
    }
  };

  signup = (req,res) => {
    res.render('signup');
  };

  resetPassword = (req,res) => {
    res.render('resetPassword')
  }
}

export const viewsController = new ViewsController();
