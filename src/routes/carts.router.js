import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { cartsController } from "../controllers/carts.controller.js";
const router = Router();


router.get('/', cartsController.getCarts)

router.get('/:cid', cartsController.getById);

router.post('/', cartsController.createCart);
// Crea un nuevo carro

router.put('/:cid/product/:pid',authMiddleware(['premium','user']), cartsController.updateCart);
// Agrega un producto que no pertenecia al carro en el carro o incrementarlo en uno en caso de que ya pertenesca al carro.

router.put('/subtract/:cid/product/:pid',authMiddleware(['premium','user']),cartsController.subtractQuantity);
// Quita 1 cantidad y elimina el producto del carro en caso de que la cantidad sea 0 

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


router.delete('/:cid/product/:pid',authMiddleware('user'), cartsController.deleteAProduct);
// Elimina un producto de un carro

router.delete('/:cid',authMiddleware('user'), cartsController.emptyCart);
// Hace que si una carro especifico tenga productos dentro de su arreglo, el arreglo se vacie.

router.put('/quantity/:cid/product/:pid',authMiddleware(['premium','user']), cartsController.modifyQuantity);
// Modifica la cantidad de un producto dentro de una carro, pasado por body la nueva cantidad.


router.get('/:cid/purchase',authMiddleware('user'), cartsController.processPurchase)

export default router;



