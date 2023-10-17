import { allCarts,getCart,newCart,addOrIncrement,getProductAndDelete,removeProductsFromCart,newQuantity,completePurchase } from "../services/carts.service.js";

export const getCarts = async (req,res) => {
    try {
        const carts = await allCarts();
        res.status(200).json({message: 'All carts', carts});
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const getById = async (req,res) => {
    const {cid} = req.params;
    try {
        const cart = await getCart(cid);
        if(!cart) return res.status(400).json(`No cart exist witch ID ${cid}`);
        res.status(200).json({message: 'Cart', cart})
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const createCart = async (req,res) => {
    try {
        const cart = await newCart();
        res.status(200).json({message: 'Created cart', cart});
    } catch (error) {
        res.status(500).json({message: error})
    }
};

export const updateCart = async (req,res) => {
    const {cid,pid} = req.params
    try {
        const cart = await addOrIncrement(cid,pid);
        res.status(200).json({message:'Cart modified', cart})
    } catch (error) {
        res.status(500).json({message:error})
    }
};

export const deleteAProduct = async (req,res) => {
    const {cid,pid} = req.params;
    try {
        const cart = await getProductAndDelete(cid,pid);
        if(!cart) return res.status(500).json({message: 'Some data is missing'});
        res.status(200).json({message:'Deleted product',cart});
    } catch (error) {
        res.status(500).json({message:error});
    }
}

export const emptyCart = async (req,res) => {
    const {cid} = req.params;
    try {
        const cart = await removeProductsFromCart(cid);
        if(!cart) return res.status(500).json({message: 'Some data is missing'});
        res.status(200).json({message: 'Deleted products', cart});
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const modifyQuantity = async (req,res) => {
    const {quantity} = req.body;
    const {cid,pid} = req.params;
    try {
        const productQuantity = await newQuantity(cid,pid,quantity);
        res.status(200).json(productQuantity);
    } catch (error) {
        res.status(500).json({error})
    }
};

export const processPurchase = async (req,res) => {
    const {cid} = req.params;
    try {
        const response = await completePurchase(cid);
        res.cookie('data', response)
        res.status(200).json({message:'Successful purchase', response});
        // res.redirect('/pay');
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

