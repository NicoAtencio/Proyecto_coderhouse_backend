import { Router } from "express";
// import product from "../managers/ProductManager.js";
import { productsManager } from "../managers/ProductManager.mongo.js";
import socketServer from "../app.js";

const router = Router();


router.get("/", async (req, res) => {
    try{
      const products = await productsManager.getProducts();
      res.status(200).json({message: 'Products' ,products});
    }catch(error){
      res.status(500).json({error});
    }
    // const products = await product.getProducts();
    // const {limit} = req.query;
    // if(limit < products.length){
    //   res.send(products.slice(0,limit));
    // }else{
    //   res.send(products);
    // }
});


router.get("/:pid", async (req, res) => {
  const {pid} = req.params;
  try {
    const product = await productsManager.getProductById(pid);
    res.status(200).json({message: 'Product', product});
  } catch (error) {
    res.status(500).json({error});
  }
  // const productId = await product.getProductId(req.params.pid);
  // typeof productId ==='string'? res.send({mensaje: productId}) : res.send([productId]);
});


router.post("/", async (req, res) => {
    try {
      const newProduct = await productsManager.createProduct(req.body);
      res.status(200).json({message: 'Create product',newProduct});
    } catch (error) {
      res.status(500).json({error});
    }
  // const body = req.body;
  // const addNewProduct = await product.addProduct(body)
  // const products = await product.getProducts();
  // socketServer.emit('datos', products);
  // res.send(addNewProduct);
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
  // const id = req.params.pid;
  // const body = req.body;
  // const modifiedProduct = await product.updateProduct(id,body);
  // typeof modifiedProduct === 'string' ? res.send({mensaje:modifiedProduct}) : res.send([modifiedProduct]);
});


router.delete("/:pid", async (req, res) => {
    const {pid} = req.params;
    try {
      const deleteProduct = await productsManager.deleteProduct(pid);
      res.status(200).json({message: 'Delete product', deleteProduct});
    } catch (error) {
      res.status(500).json({error});
    }
  // const { pid } = req.params;
  // const deletedProduct = await product.deleteProduct(pid);
  // const products = await product.getProducts();
  // socketServer.emit('eliminar', products)
  // typeof deletedProduct === 'string' ? res.send({mensaje: deletedProduct}) : res.send(deletedProduct)
});

export default router;
