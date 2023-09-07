import { productModel } from "../db/models/products.model.js";

class ProductManager {
    async getProducts(obj){
        const {limit=10,page=1,sortPrice,username,...query} = obj;
        try {
            const products = await productModel.paginate(query,{limit,page,sort:{price:sortPrice}});
            const info = {
                status: 'succes',
                totalDocs: products.totalDocs,
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}`: null,
                prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null
            };
            return info;
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

// Ejemplos de como hacer peticiones get
// http://localhost:8080/api/products?title=Televisor
// http://localhost:8080/api/products?sortPrice=ASC
// http://localhost:8080/api/products?limit=2&page=2