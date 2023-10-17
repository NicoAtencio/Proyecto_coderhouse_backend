import { getProducts } from "../services/views.service.js";

export const products = async (req,res) => {
    const response = await productsManager.getProducts(req.query);
    const {username} = req.query;
    const products = response.payload.map(product => ({ ...product}));
    // Hace un objeto sin prototipo para poder usarlo en la vista products.handlebars
    if(username){
        res.render('products', {products,username:{username:username,value:true}});
    }else{
        res.render('products', {products});
    }
};

class ViewsController {
    processPurchaseData (req,res){
        console.log(req.cookies);
        console.log('Esta entrando pero no se renderiza')
        res.render('confirmPayment',{data:req.cookies.data})
    }
};

export const viewsController = new ViewsController();