import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";

export const getProducts = async (query) => {
    try {
        return await productsManager.getProducts(query);
    } catch (error) {
        return error;
    }
};

export const findProduct = async (id) => {
    try {
        const product = await productsManager.findById(id);
        return product
    } catch (error) {
        return error
    }
};

export const newProduct = async (obj) => {
    try {
        return await productsManager.createOne(obj)
    } catch (error) {
        return error;
    }
};

export const updateProduct = async (id,obj) => {
    try {
        return await productsManager.updateOne(id,obj);
    } catch (error) {
        return error;
    }
};

export const deleteProduct = async (id) => {
    try {
        return await productsManager.deleteOne(id)
    } catch (error) {
        return error;
    }
}