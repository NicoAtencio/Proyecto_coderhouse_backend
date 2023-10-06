import { user, userGitHub, newUserGitHub } from "../services/passport.service.js";

export const findUser = async (username,password) => {
    const response  = await user(username,password);
    if(!response) return false;
    return response;
};

export const findUserGitHub = async (username) => {
    try {
        const response = await userGitHub(username);
        if(!response) return false;
        return response;
    } catch (error) {
        return error;
    }
};

export const createUserGitHub = async (obj) => {
    try {
        const newUser = await newUserGitHub(obj);
        return newUser;
    } catch (error) {
        return error;
    }
}