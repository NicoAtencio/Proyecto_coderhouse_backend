import {passportServices } from "../services/passport.service.js";

class PassportControllers {

    findUser = async (username,password) => {
        const response  = await passportServices.user(username,password);
        await passportServices.updateDateConecction(response._id);
        if(!response) return false;
        return response;
    };

    findUserGitHub = async (username) => {
        try {
            const response = await passportServices.userGitHub(username);
            if(!response) return false;
            await passportServices.updateDateConecction(response._id);
            return response;
        } catch (error) {
            return error;
        }
    };
    
    createUserGitHub = async (obj) => {
        try {
            const newUser = await passportServices.newUserGitHub(obj);
            return newUser;
        } catch (error) {
            return error;
        }
    }

};

export const passportControllers = new PassportControllers();