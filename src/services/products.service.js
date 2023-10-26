import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";

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
            return await productsManager.createOne(obj)
        } catch (error) {
            throw error;
        }
    };

    async updateProduct (id,obj) {
        try {
            return await productsManager.updateOne(id,obj);
        } catch (error) {
            throw error;
        }
    };

    deleteProduct = async (id) => {
        try {
            return await productsManager.deleteOne(id)
        } catch (error) {
            throw error;
        }
    }
};

export const productsServices = new ProductsServices();
