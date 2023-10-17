import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";

export const newChat = async () => {
    try {
        const response = await chatManager.createOne();
        return response;
    } catch (error) {
        return error;
    }
}