import { cartModel } from "../db/models/carts.model.js";

class CartManager {
    async getCarts(){
        try{
            const carts = await cartModel.find({});
            return carts;
        } catch(error){
            return error;
        }
    };

    async getCartById (id){
        try {
            const cart = await cartModel.findById(id);
            return cart;
        } catch (error) {
            return error;
        }
    }

    async createCart(){
        try {
            const newCart = await cartModel.create({products:[]});
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async insertProduct(cid,pid){
        try {
            const cart = await cartModel.findById(cid);
            const array = cart.products;
            const index = array.findIndex(p => p.product == pid);
            console.log(index)
            if(index === -1){
                array.push({product:pid,quantity:1})
                console.log('Entro a donde no hay indice')
            }else{
                array[index].quantity++;
                console.log('Entro a aumentar la cantidad');
                }           
            cart.save();
            return array;
        } catch (error) {
            return error
        }
    };

    async deleteCart(id){
        try {
            const deleteCart = await cartModel.findByIdAndDelete(id);
            console.log(deleteCart);
            return deleteCart;
        } catch (error) {
            return error
        }
    }
}

export const cartManager = new CartManager();

