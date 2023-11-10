import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", productsController.allProducts)


router.get("/:pid", productsController.getProductById) 


router.post("/",authMiddleware(['admin','premium']), productsController.createNewProduct)


router.put("/:pid",authMiddleware(['admin','premium']), productsController.editProduct) 


router.delete("/:pid",authMiddleware(['admin','premium']), productsController.deleteOneProduct)


export default router;
