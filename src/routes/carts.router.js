import { Router } from "express";
import carts from "../CartsManager.js";

const router = Router();


router.get('/:cid', async (req,res) => {
    const listProducts = await carts.getCartId(req.params.cid);
    res.send(listProducts);
});

router.post('/', async (req,res) => {
    const newCart = await carts.addNewCart();
    res.send(newCart);
});

router.post('/:cid/product/:pid', async (req,res) => {
    const newProduct = await carts.addProduct(req.params.cid, req.params.pid);
    res.send(newProduct);
})

export default router;



