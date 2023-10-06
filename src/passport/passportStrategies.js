import passport from "passport";
import userModel from "../dao/models/users.model.js";
import {Strategy as GithubStrategy} from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import config from "../config.js";
import { findUser, findUserGitHub, createUserGitHub } from "../controllers/passport.controller.js";

passport.use('local', new LocalStrategy(
    async function (username,password,done){
        try {
            const userDB = await findUser(username, password);
            if(!userDB) return done(null,false);
            done(null,userDB);
        } catch (error) {
            done(error)
        }
    }
));


passport.use('github',new GithubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost:8080/api/users/github"
  },
  async(accessToken, refreshToken, profile, done) => {
    try {
        const userDB = await findUserGitHub(profile.username);
        if(userDB){
            return done(null,userDB)
        };
        const obj = {
            first_name:profile.displayName.split(' ')[0],
            last_name:profile.displayName.split(' ')[1],
            user_name: profile.username,
            password:' ',
            fromGithub: true,
            age: ' ',
            email: profile.emails[0].value
        }
        const newUser = await createUserGitHub(obj);
        done(null,newUser)
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