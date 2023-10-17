import { Router } from "express";
import passport from "passport";
import { grantAccess } from "../controllers/login.controller.js";


const router = Router();

// Local passport

router.post('/' , passport.authenticate('local', {
    failureRedirect: '/login', 
}), grantAccess);


export default router;