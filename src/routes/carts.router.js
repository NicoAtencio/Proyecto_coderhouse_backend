import { Router } from "express";
import { getCarts, getById,createCart,updateCart,deleteAProduct, emptyCart, modifyQuantity,processPurchase } from "../controllers/carts.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.get('/', getCarts)

router.get('/:cid', getById);

router.post('/', createCart);
// Crea un nuevo carro

router.put('/:cid/product/:pid',authMiddleware('user'), updateCart);
// Agrega un producto que no pertenecia al carro en el carro o incrementarlo en uno en caso de que ya pertenesca al carro.

// router.delete('/:cid', async (req,res) => {
//     const {cid} = req.params;
//     try {
//         const deleteCart = await cartManager.deleteCart(cid)
//         res.status(200).json({message:'Delele cart', deleteCart});
//     } catch (error) {
//         res.status(500).json({error})
//     }
// });
// Elimina por completo un carro lo comente porque en la entrega esta ruta es para eliminar los productos del carro no para eliminar el carro.


router.delete('/:cid/product/:pid',authMiddleware('user'), deleteAProduct);
// Elimina un producto de un carro

router.delete('/:cid',authMiddleware('user'), emptyCart);
// Hace que si una carro especifico tenga productos dentro de su arreglo, el arreglo se vacie.

router.put('/quantity/:cid/product/:pid',authMiddleware('user'), modifyQuantity);
// Modifica la cantidad de un producto dentro de una carro, pasado por body la nueva cantidad.

router.get('/:cid/purchase',authMiddleware('user'), processPurchase)

export default router;



