import { Router } from "express";
import product from "../managers/ProductManager.js";

const router = Router();

router.get('/', async (req,res) => {
    const products = await product.getProducts();
    console.log(products);
    res.render('home', {products});
});

router.get('/realtimeproducts', async(req,res) => {
    const products = await product.getProducts();
    res.render('realTimeProducts', {products});
})

export default router;