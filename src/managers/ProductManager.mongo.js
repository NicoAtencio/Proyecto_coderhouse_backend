import { productModel } from "../db/models/products.model.js";

class ProductManager {
    async getProducts(){
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            return error
        }
    };

    async createProduct(obj){
        try {
            const newProduct = await productModel.create(obj);
            return newProduct;
        } catch (error) {
            return error
        }
    };

    async getProductById (id){
        try {
            const product = await productModel.findById(id);
            return product;
        } catch(error){
            return error;
        }
    };

    async updateProduct (id,obj){
        try {
            const updateProduct = await productModel.findByIdAndUpdate(id,obj);
            return updateProduct;
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id){
        try{
            const deleteProduct = await productModel.findByIdAndDelete(id);
            return deleteProduct;
        }catch (error){
            return error;
        }
    }
};

export const productsManager = new ProductManager();