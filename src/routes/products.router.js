import { Router } from "express";
import product from "../ProductManager.js";
import socketServer from "../app.js";

const router = Router();


router.get("/", async (req, res) => {
    const products = await product.getProducts();
    const {limit} = req.query;
    if(limit < products.length){
      res.send(products.slice(0,limit));
    }else{
      res.send(products);
    }
});


router.get("/:pid", async (req, res) => {
  const productId = await product.getProductId(req.params.pid);
  typeof productId ==='string'? res.send({mensaje: productId}) : res.send([productId]);
});


router.post("/", async (req, res) => {
  const body = req.body;
  const addNewProduct = await product.addProduct(body)
  const products = await product.getProducts();
  socketServer.emit('datos', products);
  res.send(addNewProduct);
});


router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const body = req.body;
  const modifiedProduct = await product.updateProduct(id,body);
  typeof modifiedProduct === 'string' ? res.send({mensaje:modifiedProduct}) : res.send([modifiedProduct]);
});


router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await product.deleteProduct(pid);
  const products = await product.getProducts();
  socketServer.emit('eliminar', products)
  typeof deletedProduct === 'string' ? res.send({mensaje: deletedProduct}) : res.send(deletedProduct)
});

export default router;
