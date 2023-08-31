import { Router } from "express";
import { productsManager } from "../managers/ProductManager.mongo.js"
import { cartManager } from "../managers/CartManager.mongo.js";
import { chatManager } from "../managers/chatManager.mongo.js";
import socketServer from "../app.js";

const router = Router();

router.get('/', async (req,res) => {
    const respuesta = await productsManager.getProducts(req.query);
    const products = respuesta.payload.map(product => ({ ...product}));
    // Hace un objeto sin prototipo para poder usarlo en la vista products.handlebars
    res.render('products', {products});
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
        description: p.product.description,
        price:p.product.price,
        quantity: p.quantity}));
    console.log('nuevo', nuevo)
    // console.log(products);
    res.render('cartId',{nuevo})
});

router.get('/chat', async (req,res) => {
    try {
        const respuesta = await chatManager.getMessages('64f0f89bcccc069ea5c3eb38');
        console.log(respuesta)
        const message = respuesta.messages.map(r => ({
            user: r.user,
            message: r.message
        }))
        res.render('chat',{message});
    } catch (error) {
        return error
    }
})

export default router;