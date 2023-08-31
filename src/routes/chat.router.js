import { Router } from "express";
import { chatManager } from "../managers/chatManager.mongo.js";
import socketServer from "../app.js";

const router = Router();

router.get('/:cid', async (req,res) => {
    try {
        const {cid} = req.params;
        const respuesta = await chatManager.getMessages(cid);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/:cid', async (req,res) => {
    const {cid} = req.params;
    try {
        const newMessage = await chatManager.insertChat(cid,req.body);
        // El body debe ser {user:user, message:message};
        const respuesta = await chatManager.getMessages(cid);
        console.log(respuesta)
        const messages = respuesta.messages;
        socketServer.emit('allMessages', messages)
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router;
