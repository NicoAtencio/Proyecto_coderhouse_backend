import { cartModel } from "../../../MongoDB/models/carts.model.js";
import BasicManager from "./BasicManager.mongo.js";

class CartManager extends BasicManager {
    constructor(){
        super(cartModel,'products.product')
    }
    async insertProductOrIncreaseQuantity(cid,pid){
        try {
            const cart = await cartModel.findById(cid);
            const array = cart.products;
            const index = array.findIndex(p => p.product == pid);
            if(index === -1){
                array.push({product:pid,quantity:1})
                await cart.save();
            }else{
                array[index].quantity++;
                await cart.save();
            }       
            // return array;
            const result = await cartModel.findById(cid).populate('products.product');
            return result;
        } catch (error) {
            return error
        }
    };
    // Lo que hace es insertar un producto en el carro en caso de que no exista el producto en el carro o le aumenta uno mas a la cantidad
    // en caso de que si exista.

    // async deleteCart(id){
    //     try {
    //         const deleteCart = await cartModel.findByIdAndDelete(id);
    //         return deleteCart;
    //     } catch (error) {
    //         return error
    //     }
    // }

    async deleteProduct(cid,pid){
        try {
            const cart = await cartModel.findById(cid);
            const array = cart.products;
            const index = array.findIndex(p => p.product == pid);
            if(index >= 0){
                array.splice(index,1);
                await cart.save();
                return await cartModel.findById(cid).populate('products.product')
            }else{
                return `In the cart, a product with id ${pid} is not found.`
            }
        } catch (error) {
            
        }
    };

    async deleteProducts(id){
        try {
            const cart = await cartModel.findById(id);
            const array = cart.products;
            array.splice(0,array.length);
            await cart.save();
            return cart
        } catch (error) {
            return error
        }
    }
    // Vacia el carro

    async updateQuantity(cid,pid,quantity){
        try {
            const cart = await cartModel.findById(cid);
            const array = cart.products;
            const index = array.findIndex(p => p.product == pid);
            if(index >= 0){
                array[index].quantity = +quantity;
                cart.save();
                const modifyCart = await cartModel.findById(cid).populate('products.product')
                return modifyCart.products[index]
            }else{
                return 'No existe el producto en el carro seleccionado'
            }
        } catch (error) {
            return error
        }
    }

}

export const cartManager = new CartManager();

// DELETE http://localhost:8080/api/carts/64ef8ba217e2c76dccc763ed/product/64e7a33c12f5c5fa5b233bae

