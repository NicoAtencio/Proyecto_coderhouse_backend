import { Router } from "express";
import { chatManager } from "../dao/managers/chatManager.mongo.js";
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
        const algo =  await chatManager.insertChat(cid,req.body);
        socketServer.emit('allMessages', algo)
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router;
