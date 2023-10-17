import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";
import { hashData } from "../utils.js";
import {cartManager} from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js"

export const newUser = async (obj) => {
    try {
        const isUserAlreadyCreated = await userManager.findUserByUsername(obj.user_name);
        if(isUserAlreadyCreated) return false;
        const hashPassword = await hashData(obj.password);
        const newCart = await cartManager.createOne();
        console.log(newCart)
        const response = await userManager.createOne({...obj, password:hashPassword,cart:[newCart._id]});
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
}