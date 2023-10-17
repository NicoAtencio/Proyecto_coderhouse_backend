import { cartManager } from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import { ticketManager } from "../DAL/DAOs/MongoDAOs/managers/TickectManager.js";

export const allCarts = async () => {
    try {
        const result = await cartManager.findAll()
        return result
    } catch (error) {
        return error
    }
};

export const getCart = async (id) => {
    try {
        const result =  await cartManager.findById(id);
        return result;
    } catch (error) {
        return error
    }
} 

export const newCart = async () => {
    try {
        const result = await cartManager.createOne();
        return result ;
    } catch (error) {
        return error;
    }
}

export const addOrIncrement = async (cid,pid) => {
    try {
        const result = await cartManager.insertProductOrIncreaseQuantity(cid,pid);
        return result;
    } catch (error) {
        return error
    }
};

export const getProductAndDelete = async (cid,pid) => {
    try {
        const result = cartManager.deleteProduct(cid,pid);
        return result;
    } catch (error) {
        return error
    }
};

export const removeProductsFromCart = async (cid) => {
    try {
        const cart = await cartManager.deleteProducts(cid);
        return cart
    } catch (error) {
        return error;
    }
};

export const newQuantity = async (cid,pid,quantity) => {
    try {
        const productQuantity = await cartManager.updateQuantity(cid,pid,quantity);
        return productQuantity;
    } catch (error) {
        return error;
    }
}

export const completePurchase = async (cid) => {
    try {
        const cart = await cartManager.findById(cid);
        const dataProducts = [];
        let priceProducts = [];
        for (const element of cart['products']){
            const pid = element['product']['_id'].toHexString()
            // Obtengo el id del producto
            const product = await productsManager.findById(pid);
            const stock = product.stock;
            // Obtengo cuanto es el stock actual del producto
            if(element.quantity < stock){
                dataProducts.push(element)
                await productsManager.updateOne(pid,{stock:stock-element.quantity});
                priceProducts.push(product.price * element.quantity);
                // Agrego al arreglo el total de la venta de cada producto para luego sumarlos.
                await cartManager.deleteProduct(cid,pid)
                // Se elimina el producto comprado del carro.
            }
        }
        // console.log(dataProducts);
        return dataProducts;
    } catch (error) {
        return error
    }
}