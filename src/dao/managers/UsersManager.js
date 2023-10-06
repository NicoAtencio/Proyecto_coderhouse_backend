import userModel from "../models/users.model.js";
import BasicManager from "./BasicManager.mongo.js"

class UserManager extends BasicManager {
    constructor(){
        super(userModel,'cart')
    };

    async findUserByUsername(username){
        try {
            const user = await userModel.findOne({user_name:username});
            return user;
        } catch (error) {
            return error;
        }
    };
};

export const userManager = new UserManager();