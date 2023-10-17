import { Router } from "express";
import { chatController} from "../controllers/chat.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', chatController.createNewChat)

router.get('/:cid', chatController.getChats)

router.post('/:cid',authMiddleware('user'), chatController.sendMessageAndFindAll)

export default router;
