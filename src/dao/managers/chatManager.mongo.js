import { chatModel } from "../models/chat.model.js";

class ChatManager {
    async createChat () {
        try {
            await chatModel.create({messages:[]});
            return 'Creado con exito'
        } catch (error) {
            return error
        }
    };
    // Crea el documento donde se va a guardar los mensajes.

    async getMessages(id){
        try {
            const chat = await chatModel.findById(id);
            return chat;
        } catch (error) {
            return error;
        }
    }

    async insertChat(id,obj){
        try {
            const respuesta = await chatModel.findById(id);
            const array = respuesta.messages;
            array.push({user: obj.user, message: obj.message});
            respuesta.save();
            return array;
        } catch (error) {
            
        }
    }
};

export const chatManager = new ChatManager();