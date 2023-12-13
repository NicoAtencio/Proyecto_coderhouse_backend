import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/users.controller.js";

const router = Router();

router.post('/signup', userController.createUser);

// Destruir sesion en caso de que exista.
router.get('/logout', userController.destroySession);


router.delete('/:uid', userController.deleteUser);


// Eliminar usuarios que hace mas de dos dias no se conectan
router.delete('/', userController.deleteUsersByTime);

router.put('/changerole', userController.newRole);

router.get('/', userController.findUsers);


// Passport GIT-HUB
router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', passport.authenticate('github',{
    failureRedirect: '/login'
}), userController.allowAccess );


export default router;