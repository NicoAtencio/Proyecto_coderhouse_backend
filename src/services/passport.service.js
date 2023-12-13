import { passportManager } from "../DAL/DAOs/MongoDAOs/managers/PassportManager.mongo.js";
import { compareData } from "../utils.js";
import {cartManager} from "../DAL/DAOs/MongoDAOs/managers/CartManager.mongo.js";
import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";

class PassportServices {

    user = async (username,password) => {
        try {
            const user = await passportManager.findUserByUsername(username);
            if(!user) return false; 
            const isPassword = await compareData(password,user.password);
            if(!isPassword) return false;
            return user;
        } catch (error) {
            return error;
        }
    };
    
    userGitHub = async (username) => {
        try {
            const user = await passportManager.findUserByUsername(username);
            if(!user) return false;
            return user;
        } catch (error) {
            return error;
        }
    };
    
    newUserGitHub = async (obj) => {
        try {
            const newCart = await cartManager.createOne();
            // Crea un carro y luego se lo asigna al usuario.
            const user = await passportManager.createOne({...obj,cart:newCart});
            return user
        } catch (error) {
            return error
        }
    };

    updateDateConecction = async (id) => {
        await userManager.updateOne(id,{last_connection:Date.now()});
        return true;
    }
}

export const passportServices = new PassportServices();
