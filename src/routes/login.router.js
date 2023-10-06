import { Router } from "express";
import { userManager } from "../dao/managers/UsersManager.js";
import {compareData} from "../utils.js"
import passport from "passport";
import { grantAccess } from "../controllers/login.controller.js";


const router = Router();

// Local passport

router.post('/' , passport.authenticate('local', {
    failureRedirect: '/login', 
}), grantAccess);


export default router;