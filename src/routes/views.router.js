import { Router } from "express";
import { productsManager } from "../managers/ProductManager.mongo.js"
import { cartManager } from "../managers/CartManager.mongo.js";
import { chatManager } from "../managers/chatManager.mongo.js";
import socketServer from "../app.js";

const router = Router();

router.get('/products', async (req,res) => {
    const respuesta = await productsManager.getProducts(req.query);
    const {username} = req.query;
    const products = respuesta.payload.map(product => ({ ...product}));
    // Hace un objeto sin prototipo para poder usarlo en la vista products.handlebars
    if(username){
        res.render('products', {products,username:{username:username,value:true}});
    }else{
        res.render('products', {products});
    }
});

router.get('/realtimeproducts', async(req,res) => {
    const respuesta = await productsManager.getProducts(req.query);
    const products = respuesta.payload.map(product => ({ ...product}));
    res.render('realTimeProducts', {products});
});

router.get('/carts/:cid', async (req,res) => {
    const {cid} = req.params;
    const respuesta = await cartManager.getCartById(cid);
    const products = respuesta.products;
    const nuevo = products.map(p => ({
        id: p._id,
        product: p.product.title,
        quantity: p.quantity}));
        // Cambiar la vista para que se vea bien
    res.render('cartId',{nuevo})
});

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