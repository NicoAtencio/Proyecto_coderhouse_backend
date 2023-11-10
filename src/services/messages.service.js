import { sessionManager } from "../DAL/DAOs/MongoDAOs/managers/SessionManager.mongo.js";
import { userManager } from "../DAL/DAOs/MongoDAOs/managers/UsersManager.js";
import { compareData, hashData } from "../utils.js";

class MessagesServices {
    getMailUser = async (id) => {
        const data = await sessionManager.findById(id);
        return data.email;
    };

    newPassword = async (obj) => {
        const user = await userManager.findById(obj.id);
        console.log(obj)
        if(user.fromGithub){
            const hashPassword = await hashData(obj.passwords.old_password);
            const newPasswordFromGithub = await userManager.updateOne(obj.id,{password : hashPassword});
            return newPasswordFromGithub;
        }
        const isPassword = await compareData(obj.passwords.old_password,user.password);
        if(!isPassword){
            return false;
        };
        const hashNewPassword = await hashData(obj.passwords.new_password)
        const newPassword = await userManager.updateOne(obj.id,{password : hashNewPassword});
        return newPassword;
    }

};

export const messageServices = new MessagesServices();