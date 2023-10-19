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
      res.render("confirmPayment", { data: req.cookies.data });
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
      res.status(500).json({message:error.message})
    }
  };
}

export const viewsController = new ViewsController();
