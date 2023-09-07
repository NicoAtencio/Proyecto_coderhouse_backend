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
            const cart = await cartModel.findById(id).populate('products.product');
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
            if(index === -1){
                array.push({product:pid,quantity:1})
                cart.save();
            }else{
                array[index].quantity++;
                cart.save();
            }       
            return array;
        } catch (error) {
            return error
        }
    };

    async deleteCart(id){
        try {
            const deleteCart = await cartModel.findByIdAndDelete(id);
            return deleteCart;
        } catch (error) {
            return error
        }
    }

    async deleteProduct(cid,pid){
        try {
            const cart = await cartModel.findById(cid);
            const array = cart.products;
            const index = array.findIndex(p => p.product == pid);
            if(index >= 0){
                array.splice(index,1);
                cart.save();
            }else{
                return `No existe producto con el id ${pid}`
            }
        } catch (error) {
            
        }
    };

    async deleteProducts(id){
        try {
            const cart = await cartModel.findById(id);
            const array = cart.products;
            array.splice(0,array.length);
            cart.save();
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
                return array[index]
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

