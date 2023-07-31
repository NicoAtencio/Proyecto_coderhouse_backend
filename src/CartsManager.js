import { existsSync, promises } from "fs";
import { __dirmane } from "./utils.js";

class CartsManager {
    constructor(path){
        this.path = path;
    };
    
    
    async getCarts(){
        if(existsSync(this.path)){
            try{
                const carts = await promises.readFile(this.path, "utf-8");
                return JSON.parse(carts);
            }catch (err){
                return err;
            }
        }else{
            return [];
        }
    };

    async getCartId(id){
        const array = await this.getCarts();
        const cartId = array.findIndex(c => c.id == id);
        return cartId >= 0 ?  array[cartId].products :  {mensaje: `No existe el carro con el id ${id}`};
    }

    async addNewCart(){
        const array = await this.getCarts();
        const id = array.length ? array[array.length - 1].id + 1 : 1;
        const newCart= {id,products:[]};
        array.push(newCart);
        try{
            await promises.writeFile(this.path, JSON.stringify(array));
            return [newCart];
        }catch (err){
            return err;
        }
    };

    async addProduct(cid,pid){
        const array = await this.getCarts();
        const cart = array.find(c => c.id == cid);
        if(!cart) return {mensaje: `No existe un carro con el id ${cid}`};
        const indexCart = array.findIndex(c => c.id == cid)
        const product = cart.products.find(p => p.product == pid);
        if(!product){
            cart.products.push({product: +pid, quantity:1});
            array[indexCart] = cart;
            try{
                promises.writeFile(this.path, JSON.stringify(array));
                return [{product: +pid, quantity:1}];
            }catch (err){
                return err;
            }
        }else{
            const indexProduct = cart.products.findIndex(p => p.product == pid)
            array[indexCart].products[indexProduct].quantity++;
            try{
                promises.writeFile(this.path, JSON.stringify(array));
                return array[indexCart].products[indexProduct];
            }catch(err){
                return err;
            }
        }
    }
}

const carts = new CartsManager(__dirmane+'/data/carts.json');
export default carts