import { Router } from "express";
import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js"
import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";
import socketServer from "../app.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { viewsController } from "../controllers/views.controller.js";

const router = Router();

router.get('/products', viewsController.products);

router.get('/realtimeproducts',authMiddleware('admin'), viewsController.realTime);

router.get('/carts/:cid', viewsController.getCart);

router.get('/chat', async (req,res) => {
    try {
        const respuesta = await chatManager.getMessages('64f0f89bcccc069ea5c3eb38');
        const message = respuesta.messages.map(r => ({
            user: r.user,
            message: r.message
        }))
        res.render('chat',{message});
    } catch (error) {
        return error
    }
});

router.get('/pay', viewsController.processPurchaseData)

// login y signup

router.get('/login', (req,res) => {
    const {username} = req.query;
    if(username){
        res.render('login', {username,value:true});
    }else{
        res.render('login');
    }
});

router.get('/signup', (req,res) => {
    res.render('signup');
})

export default router;