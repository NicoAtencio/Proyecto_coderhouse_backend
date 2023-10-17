import { Router } from "express";
import { getData } from "../controllers/session.controller.js";

const router = Router();

router.get('/current', getData)

export default router;