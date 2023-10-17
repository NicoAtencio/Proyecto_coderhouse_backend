import { Router } from "express";
import { allProducts,getProductById,createNewProduct,editProduct,deleteOneProduct } from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", allProducts)


router.get("/:pid", getProductById) 


router.post("/",authMiddleware('admin'), createNewProduct)


router.put("/:pid",authMiddleware('admin'), editProduct) 


router.delete("/:pid",authMiddleware('admin'), deleteOneProduct)


export default router;
