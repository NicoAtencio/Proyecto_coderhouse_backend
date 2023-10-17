import { productsManager } from "../DAL/DAOs/MongoDAOs/managers/ProductManager.mongo.js";

export const getProducts = async (query) => {
    try {
        const products = await productsManager.getProducts(query);
        return products;
    } catch (error) {
        return error;
    }
}