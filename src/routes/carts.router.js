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
});

router.post('/', async (req,res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(200).json({message:'Create cart', newCart});
    } catch (error) {
        res.status(500).json({error})
    }
});
// Crea un nuevo carro

router.post('/:cid/product/:pid', async (req,res) => {
    const { cid, pid } = req.params;
    const insertProduct = await cartManager.insertProduct(cid,pid);
    res.send(insertProduct);
});
// Agrega un producto que no pertenecia al carro en el carro.

// router.delete('/:cid', async (req,res) => {
//     const {cid} = req.params;
//     try {
//         const deleteCart = await cartManager.deleteCart(cid)
//         res.status(200).json({message:'Delele cart', deleteCart});
//     } catch (error) {
//         res.status(500).json({error})
//     }
// });
// Elimina todo un carro lo comente porque en la entrega esta ruta es para eliminar los productos del carro no para eliminar el carro.


router.delete('/:cid/product/:pid', async (req,res) => {
    const {cid,pid} = req.params;
    try{
        await cartManager.deleteProduct(cid,pid);
        const cart = await cartManager.getCartById(cid);
        res.status(200).json(cart);
    } catch(error) {
        res.status(500).json({error})
    }
});
// Elimina un producto de un carro

router.delete('/:cid', async (req,res) => {
    const {cid} = req.params;
    try {
        const cart = await cartManager.deleteProducts(cid);
        console.log('cart actualizado',cart)
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({error})
    }
});
// Hace que si una carro especifico tenga productos dentro de su arreglo, el arreglo se vacie.

router.put('/:cid/product/:pid', async (req,res) => {
    const {quantity} = req.body;
    const {cid,pid} = req.params;
    try {
        const productQuantity = await cartManager.updateQuantity(cid,pid,quantity);
        res.status(200).json(productQuantity);
    } catch (error) {
        res.status(500).json({error})
    }
});
// Modifica la cantidad de un producto dentro de una carro, pasado por body la nueva cantidad.

export default router;



