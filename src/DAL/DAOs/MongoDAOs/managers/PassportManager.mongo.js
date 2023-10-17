import BasicManager from "./BasicManager.mongo.js";
import userModel from "../../../MongoDB/models/users.model.js";

class PassportManager extends BasicManager {
    constructor(){
        super(userModel,'Cart');
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

export const passportManager = new PassportManager();