import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/users.controller.js";

const router = Router();

router.post('/signup', userController.createUser)


router.get('/logout', userController.destroySession);
// Al realizar la peticion get destruye la sesion en caso de que exista.


// Passport GIT-HUB
router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', passport.authenticate('github',{
    failureRedirect: '/login'
}), userController.allowAccess );


export default router;