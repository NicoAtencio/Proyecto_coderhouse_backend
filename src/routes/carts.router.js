import { Router } from "express";
// import carts from "../managers/CartsManager.js";
import { cartManager } from "../managers/CartManager.mongo.js";

const router = Router();


router.get('/', async (req,res) => {
    try {
        const carts = await cartManager.getCarts();
        res.status(200).json({message: 'carts', carts});
    } catch (error) {
        res.status(500).json({error});
    }
})

router.get('/:cid', async (req,res) => {
    const {cid} = req.params;
    try {
        const cart = await cartManager.getCartById(cid);
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({error});
    }
    // const listProducts = await carts.getCartId(req.params.cid);
    // res.send(listProducts);
});

router.post('/', async (req,res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(200).json({message:'Create cart', newCart});
    } catch (error) {
        res.status(500).json({error})
    }
    // const newCart = await carts.addNewCart();
    // res.send(newCart);
});

router.post('/:cid/product/:pid', async (req,res) => {
    const { cid, pid } = req.params;
    const insertProduct = await cartManager.insertProduct(cid,pid);
    res.send(insertProduct);
    // const newProduct = await carts.addProduct(req.params.cid, req.params.pid);
    // res.send(newProduct);
});

router.delete('/:cid', async (req,res) => {
    const {cid} = req.params;
    try {
        const deleteCart = await cartManager.deleteCart(cid)
        res.status(200).json({message:'Delele cart', deleteCart});
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router;



