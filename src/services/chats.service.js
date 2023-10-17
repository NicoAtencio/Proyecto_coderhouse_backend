import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";

class ChatServices{
    async newChat(){
        try {
            const response = await chatManager.createOne();
            return response;
        } catch (error) {
            return error;
        }
    };

    async findChats(cid){
        try {
            const response = await chatManager.getMessages(cid);
            return response;
        } catch (error) {
            return error;
        }
    }

    async sendAndGet(cid,obj){
        try {
            const response = await chatManager.insertChat(cid,obj);
            return response;
        } catch (error) {
            return error;
        }
    }

}


export const chatServices = new ChatServices();