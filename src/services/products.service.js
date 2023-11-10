import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";
import  {sessionManager}  from "../DAL/DAOs/MongoDAOs/managers/SessionManager.mongo.js";

class ProductsServices{
    
    async getProducts (query) {
        try {
            return await productsManager.getProducts(query);
        } catch (error) {
            throw error;
        }
    };

    async findProduct (id) {
        try {
            const product = await productsManager.findById(id);
            return product
        } catch (error) {
            throw error
        }
    };

    async newProduct (obj) {
        try {
            const user = await sessionManager.findById(obj.id);
            if(user.role === 'premium'){
                return await productsManager.createOne({...obj.product, owner: obj.id})
            }
            return await productsManager.createOne(obj);
        } catch (error) {
            throw error;
        }
    };

    async updateProduct (pid,obj,uid) {
        const user = await sessionManager.findById(uid);
        if(user.role === 'premium'){
            const product = await productsManager.findById(pid);
            if(product.owner == uid){
                return await productsManager.updateOne(pid,obj);
            }else{
                return false;
            }
        }
        try {
            return await productsManager.updateOne(pid,obj);
        } catch (error) {
            throw error;
        }
    };

    deleteProduct = async (pid,uid) => {
        try {
            const user = await sessionManager.findById(uid);
            if(user.role === "premium"){
                const product = await productsManager.findById(pid);
                if(product.owner == uid){
                    return await productsManager.deleteOne(pid)
                }else{
                    return false;
                }
            }
            return await productsManager.deleteOne(pid)
        } catch (error) {
            throw error;
        }
    }
};

export const productsServices = new ProductsServices();
