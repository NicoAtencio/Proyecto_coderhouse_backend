import { Router } from "express";
import { messagesControllers } from "../controllers/messages.controller.js";

const router = Router();

router.get('/', messagesControllers.sendMail);

router.post('/newpassword', messagesControllers.resetPassword);

export default router;