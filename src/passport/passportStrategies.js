import passport from "passport";
import userModel from "../db/models/users.model.js";
import {Strategy as GithubStrategy} from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { userManager } from "../managers/UsersManager.js";
import { compareData } from "../utils.js";

passport.use('local', new LocalStrategy(
    async function (username,password,done){
        try {
            const userDB = await userManager.findUser(username);
            if(!userDB){
                return done(null,false);
            }
            const isPassword = await compareData(password,userDB.password);
            if(!isPassword){
                return done(null,false);
            }
            return done(null,userDB)
        } catch (error) {
            done(error)
        }
    }
));

passport.use('github',new GithubStrategy({
    clientID: 'Iv1.c41d98b0761200ab',
    clientSecret: '609f4297bfa97f442a20be08372dced6fdc0a9c2',
    callbackURL: "http://localhost:8080/api/users/github"
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
        const userDB = await userManager.findUser(profile.username);
        if(userDB){
            return done(null,userDB);
        }
        const newUser = {
            first_name:profile.displayName.split(' ')[0],
            last_name:profile.displayName.split(' ')[1],
            user_name: profile.username,
            password:' ',
            fromGithub: true
        };
        const result = await userManager.create(newUser);
        return done(null,result)
    } catch (error) {
        done(error)
    }
  }
));

passport.serializeUser((usuario,done) => {
    done(null,usuario._id)
});

passport.deserializeUser(async(id,done) => {
    try {
        const user = await userModel.findById(id);
        done(null,user);
    } catch (error) {
        done(error);
    }
})