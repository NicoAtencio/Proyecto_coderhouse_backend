import { chatServices } from "../services/chats.service.js";
import socketServer from "../index.js";

class ChatController {
    async createNewChat (req,res) {
        try {
            const chat = await chatServices.newChat();
            res.status(200).json({message:'Created new chat',chat});
        } catch (error) {
            res.status(500).json({message:error});
        }
    };

    async getChats (req,res){
        try {
            const {cid} = req.params;
            const respuesta = await chatServices.findChats(cid)
            res.status(200).json(respuesta);
        } catch (error) {
            res.status(500).json({error})
        }
    }


    async sendMessageAndFindAll(req,res){
        const {cid} = req.params;
        try {
            const newMessagesAndAllMessages =  await chatServices.sendAndGet(cid,req.body);
            socketServer.emit('allMessages', newMessagesAndAllMessages)
            res.status(200).json({message:'Message send'});
        } catch (error) {
            res.status(500).json({error})
        }
    }

    async clearChat (req,res){
        const {cid} = req.params;
        try {
            await chatServices.clear(cid);
            res.status(200).json({message: 'Chat cleared'});
        } catch (error) {
            res.status(500).json(error)
        }
    }

}


export const chatController = new ChatController();