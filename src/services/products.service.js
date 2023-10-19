import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";

class ProductsServices{
    
    async getProducts (query) {
        try {
            return await productsManager.getProducts(query);
        } catch (error) {
            return error;
        }
    };

    async findProduct (id) {
        try {
            const product = await productsManager.findById(id);
            return product
        } catch (error) {
            return error
        }
    };

    async newProduct (obj) {
        try {
            return await productsManager.createOne(obj)
        } catch (error) {
            return error;
        }
    };

    async updateProduct (id,obj) {
        try {
            return await productsManager.updateOne(id,obj);
        } catch (error) {
            return error;
        }
    };

    deleteProduct = async (id) => {
        try {
            return await productsManager.deleteOne(id)
        } catch (error) {
            return error;
        }
    }
};

export const productsServices = new ProductsServices();
