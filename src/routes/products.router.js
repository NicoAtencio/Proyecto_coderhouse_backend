import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", productsController.allProducts)


router.get("/:pid", productsController.getProductById) 


router.post("/",authMiddleware('admin'), productsController.createNewProduct)


router.put("/:pid",authMiddleware('admin'), productsController.editProduct) 


router.delete("/:pid",authMiddleware('admin'), productsController.deleteOneProduct)


export default router;
