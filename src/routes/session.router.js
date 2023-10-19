import { Router } from "express";
import { sessionControllers } from "../controllers/session.controller.js";

const router = Router();

router.get('/current', sessionControllers.getData)

export default router;