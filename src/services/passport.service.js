import { passportManager } from "../DAL/DAOs/MongoDAOs/managers/PassportManager.mongo.js";
import { compareData } from "../utils.js";

export const user = async (username,password) => {
    try {
        const user = await passportManager.findUserByUsername(username);
        if(!user) return false; 
        const isPassword = await compareData(password,user.password);
        if(!isPassword) return false;
        return user
    } catch (error) {
        return error;
    }
};

export const userGitHub = async (username) => {
    try {
        const user = await passportManager.findUserByUsername(username);
        if(!user) return false;
        return user;
    } catch (error) {
        return error;
    }
};

export const newUserGitHub = async (obj) => {
    try {
        const user = await passportManager.createOne(obj);
        return user
    } catch (error) {
        return error
    }
};