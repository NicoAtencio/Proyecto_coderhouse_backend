import { Router } from "express";
import { userManager } from "../managers/UsersManager.js";
import {compareData} from "../utils.js"


const router = Router();

router.post('/',async (req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: 'Some data is missing'});
    };
    const userDB = await userManager.findUser(username);
    if(!userDB){
        return res.status(400).json({message: 'Signup first'})
    };
    const isPasswordValid = await compareData(password,userDB.password);
    if(!isPasswordValid){
        return res.status(401).json({message: 'Username or paswword not value.'})
    };
    req.session['username'] = username,
    req.session['password'] = userDB.password;
    res.redirect(`/products?username=${username}`);
});

export default router;