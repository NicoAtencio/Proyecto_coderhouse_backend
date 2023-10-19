import { productsServices } from "../services/products.service.js";
import socketServer from "../app.js";

class ProductsController {
    
    async allProducts (req,res){
        try {
            const products = await productsServices.getProducts(req.query);
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({message: error})
        }
    };

    async getProductById (req,res) {
        const {pid} = req.params;
        try {
            const product = await productsServices.findProduct(pid);
            if(!product) return res.status(400).json({mesagge: `There is no product with ID ${pid}`});
            res.status(200).json({product})
        } catch (error) {
            res.status(500).json({message:error})
        }
    };

    async createNewProduct (req,res) {
        try {
            const product = await productsServices.newProduct(req.body);
            const response = await productsServices.getProducts({limit:200});
            const products = response.payload.map(prod => ({ ...prod}));
            socketServer.emit('datos', products);
            res.status(200).json({message: 'Create product',product});
        } catch (error) {
            res.status(500).json({mesagge: error})
        }
    };

    async editProduct (req,res) {
        const {pid} = req.params;
        try {
            const product = await productsServices.updateProduct(pid,req.body);
            res.status(200).json({message: 'Update product', 'Product': {...product._doc,...req.body}});
    //       // Esto lo que hace es mostrar el producto actualizado como respuesta ya que el metodo utilizado en el manager
    //       // retorna el producto antes de ser actualizado.
        } catch (error) {
            res.status(500).json({mesagge: error})
        }
    };

    async deleteOneProduct (req, res) {
        const {pid} = req.params;
        try {
          const response = await productsServices.deleteProduct(pid);
          const respuesta = await productsServices.getProducts({limit:200});
          const products = respuesta.payload.map(product => ({ ...product}));
          socketServer.emit('eliminar', products);
          res.status(200).json({message: 'Delete product', response});
        } catch (error) {
          res.status(500).json({error});
        }
    };
};

export const productsController = new ProductsController();


