import { productModel } from "../../../MongoDB/models/products.model.js";
import BasicManager from "./BasicManager.mongo.js";

class ProductManager extends BasicManager {
    constructor(){
        super(productModel)
    }
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
            throw error
        }
    };
    
};

export const productsManager = new ProductManager();

// Ejemplos de como hacer peticiones get
// http://localhost:8080/api/products?title=Televisor
// http://localhost:8080/api/products?sortPrice=ASC
// http://localhost:8080/api/products?limit=2&page=2