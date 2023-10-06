import { Router } from "express";
import { allProducts,getProductById,createNewProduct,editProduct,deleteOneProduct } from "../controllers/products.controller.js";

const router = Router();


router.get("/", allProducts)


router.get("/:pid", getProductById) 


router.post("/", createNewProduct)


router.put("/:pid", editProduct) 


router.delete("/:pid", deleteOneProduct)


export default router;
