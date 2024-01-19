import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from '../utils/messagesError.js';
import { login, register, github, githubCallback, current, logout } from "../controllers/session.controller.js";



const sessionRouter = Router();


sessionRouter.post('/login', passport.authenticate('login'),  login);
sessionRouter.post('/register', passport.authenticate('register'), register);
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user: email'] }), github)
sessionRouter.get('/githubCallback', passport.authenticate('github'), githubCallback )
sessionRouter.get('/current', passportError('jwt'), authorization('user'),  current)
sessionRouter.get('/logout', logout);



export default sessionRouter;


