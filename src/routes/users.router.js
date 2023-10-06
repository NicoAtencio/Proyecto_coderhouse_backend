import { Router } from "express";
// import { userManager } from "../dao/managers/UsersManager.js";
// import { hashData } from "../utils.js";
import passport from "passport";
import { createUser,destroySession,allowAccess } from "../controllers/users.controller.js";

const router = Router();

router.post('/signup', createUser)


router.get('/logout', destroySession);
// Al realizar la peticion get destruye la sesion en caso de que exista.


// Passport GIT-HUB
router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', passport.authenticate('github',{
    failureRedirect: '/login'
}), allowAccess );


export default router;