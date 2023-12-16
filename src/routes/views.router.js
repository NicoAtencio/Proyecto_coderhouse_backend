import { Router } from "express";
import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js"
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";
import socketServer from "../app.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { viewsController } from "../controllers/views.controller.js";

const router = Router();

router.get('/products', viewsController.products);

router.get('/realtimeproducts',authMiddleware(['admin','premium']), viewsController.realTime);

router.get('/carts/:cid', viewsController.getCart);

router.get('/chat',viewsController.getMessages);

router.get('/pay', viewsController.processPurchaseData)

router.get('/users',authMiddleware('admin') ,viewsController.getUsers);

// login y signup

router.get('/login', viewsController.login);

router.get('/signup', viewsController.signup);

router.get('/resetpassword', viewsController.resetPassword);


export default router;