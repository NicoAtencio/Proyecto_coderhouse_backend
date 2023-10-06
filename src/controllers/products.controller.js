import { getProducts,findProduct,newProduct,updateProduct,deleteProduct } from "../services/products.service.js";
import socketServer from "../app.js";

export const allProducts = async (req,res) => {
    try {
        const products =  await getProducts(req.query);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error})
    }
};

export const getProductById = async (req,res) => {
    const {pid} = req.params;
    try {
        const product = await findProduct(pid);
        if(!product) return res.status(400).json({mesagge: `There is no product with ID ${pid}`});
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({message:error})
    }
};

export const createNewProduct = async (req,res) => {
    try {
        const product = await newProduct(req.body);
        const response = await getProducts({limit:200});
        const products = response.payload.map(prod => ({ ...prod}));
        socketServer.emit('datos', products);
        res.status(200).json({message: 'Create product',product});
    } catch (error) {
        res.status(500).json({mesagge: error})
    }
};

export const editProduct = async (req,res) => {
    const {pid} = req.params;
    try {
        const product = await updateProduct(pid,req.body);
        res.status(200).json({message: 'Update product', 'Product': {...product._doc,...req.body}});
//       // Esto lo que hace es mostrar el producto actualizado como respuesta ya que el metodo utilizado en el manager
//       // retorna el producto antes de ser actualizado.
    } catch (error) {
        res.status(500).json({mesagge: error})
    }
};

export const deleteOneProduct = async (req, res) => {
    const {pid} = req.params;
    try {
      const response = await deleteProduct(pid);
      const respuesta = await getProducts({limit:200});
      const products = respuesta.payload.map(product => ({ ...product}));
      socketServer.emit('eliminar', products);
      res.status(200).json({message: 'Delete product', deleteProduct});
    } catch (error) {
      res.status(500).json({error});
    }
};