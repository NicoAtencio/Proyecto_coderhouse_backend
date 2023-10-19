import { mockingGenerate } from "../mocking/mocks.js";

class MockingController {
    createProductsByMockin (req,res){
        const products = mockingGenerate.generateProducts(100);
        // Estamos haciendo que se creen 100 productos
        if(!products) return res.json('Error creating the products');
        res.json({message:'Created products by Mockin', products});
    };
};

export const mockingController = new MockingController();

