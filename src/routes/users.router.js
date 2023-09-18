import { Router } from "express";
import { userManager } from "../managers/UsersManager.js";
import { hashData } from "../utils.js";
import passport from "passport";

const router = Router();

router.post('/signup', async(req,res) => {
    const {first_name, last_name,user_name,password} = req.body;
    if(!first_name || !last_name || !user_name || !password){
        return res.status(400).json({message: 'Some data is missing'});
    }
    const userDB = await userManager.findUser(user_name);
    if(userDB){
        return res.status(400).json({message: 'Username already used'})
    };
    const hashPassword = await hashData(password);
    await userManager.create({...req.body,password:hashPassword});
    // res.status(200).json({message: 'User created', user:newUser})
    res.redirect(`/login?username=${user_name}`);
});

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) res.status(500).json({message: 'Logout failed'});
        res.redirect('/login');
    })
});
// Al realizar la peticion get destruye la sesion en caso de que exista.

// Para crear el usuario adminCoder@coder.com utilice el Thunder Client donde el body fue
// {"first_name": "Coder","last_name": "House","user_name": "adminCoder@coder.com", "password": "adminCod3r123", "rol": "admin"}

// Passport GIT-HUB
router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', passport.authenticate('github',{
    failureRedirect: '/login'
}), async (req,res) => {
    const username=req.user.user_name
    res.redirect(`/products?username=${username}`);
});


export default router;