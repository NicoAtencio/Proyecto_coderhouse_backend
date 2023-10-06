import { Router } from "express";
import { userManager } from "../dao/managers/UsersManager.js";
import { getData } from "../controllers/session.controller.js";

const router = Router();

router.get('/current', getData)

export default router;