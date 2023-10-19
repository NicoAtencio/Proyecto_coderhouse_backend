import { Router } from "express";
import passport from "passport";
import {loginController} from "../controllers/login.controller.js"


const router = Router();

// Local passport

router.post('/' , passport.authenticate('local', {
    failureRedirect: '/login', 
}), loginController.grantAccess);


export default router;