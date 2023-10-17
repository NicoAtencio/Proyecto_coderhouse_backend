import { newChat } from "../services/chats.service.js";

export const createNewChat = async (req,res) => {
    try {
        const chat = await newChat();
        console.log(chat);
        res.status(200).json({message:'Created new chat',chat});
    } catch (error) {
        res.status(500).json({message:error});
    }
}