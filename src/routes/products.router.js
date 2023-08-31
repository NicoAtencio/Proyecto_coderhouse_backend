import { Router } from "express";
import { productsManager } from "../managers/ProductManager.mongo.js";
import socketServer from "../app.js";

const router = Router();


router.get("/", async (req, res) => {
    try{
      const products = await productsManager.getProducts(req.query);
      res.status(200).json(products);
    }catch(error){
      res.status(500).json({error});
    }
});


router.get("/:pid", async (req, res) => {
  const {pid} = req.params;
  try {
    const product = await productsManager.getProductById(pid);
    res.status(200).json({message: 'Product', product});
  } catch (error) {
    res.status(500).json({error});
  }
});


router.post("/", async (req, res) => {
    try {
      const newProduct = await productsManager.createProduct(req.body);
      const respuesta = await productsManager.getProducts({limit:200});
      const products = respuesta.payload.map(product => ({ ...product}));
      socketServer.emit('datos', products);
      res.status(200).json({message: 'Create product',newProduct});
    } catch (error) {
      res.status(500).json({error});
    }
});


router.put("/:pid", async (req, res) => {
    const {pid} = req.params;
    try {
      const updateProduct = await productsManager.updateProduct(pid,req.body);
      res.status(200).json({message: 'Update product', 'Product': {...updateProduct._doc,...req.body}});
      // Esto lo que hace es mostrar el producto actualizado como respuesta ya que el metodo utilizado en el manager
      // retorna el producto antes de ser actualizado.
    } catch (error) {
      res.status(500).json({error})
    }
});


router.delete("/:pid", async (req, res) => {
    const {pid} = req.params;
    try {
      const deleteProduct = await productsManager.deleteProduct(pid);
      const respuesta = await productsManager.getProducts(req.query);
      const products = respuesta.payload.map(product => ({ ...product}));
      socketServer.emit('eliminar', products);
      res.status(200).json({message: 'Delete product', deleteProduct});
    } catch (error) {
      res.status(500).json({error});
    }
});

export default router;
