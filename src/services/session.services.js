import {sessionManager} from "../dao/managers/SessionManager.mongo.js"

export const dateUser = async (id) => {
    try {
        const date = await sessionManager.findById(id);
        return date;
    } catch (error) {
        return error;
    }
}