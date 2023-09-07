import userModel from "../db/models/users.model.js";

class UserManager {
    async create(user){
        try {
            const newUser = await userModel.create(user);
            return newUser;
        } catch (error) {
            return error;
        }
    }

    async findUser(username){
        try {
            const user = await userModel.findOne({user_name:username});
            return user;
        } catch (error) {
            return error;
        }
    }
};

export const userManager = new UserManager();