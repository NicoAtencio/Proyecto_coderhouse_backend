import { userManager } from "../dao/managers/UsersManager.js";
import { hashData } from "../utils.js";

export const newUser = async (obj) => {
    try {
        const isUserAlreadyCreated = await userManager.findUserByUsername(obj.user_name)
        if(isUserAlreadyCreated) return false;
        const hashPassword = await hashData(obj.password);
        const response = await userManager.createOne({...obj, password:hashPassword});
        return response;
    } catch (error) {
        return error
    }
}