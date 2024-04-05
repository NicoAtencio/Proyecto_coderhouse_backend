import { Router } from "express";
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

router.get('/', viewsController.login);

router.get('/signup', viewsController.signup);

router.get('/resetpassword', viewsController.resetPassword);


export default router;