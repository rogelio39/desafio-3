import { Router } from "express";
import {debug, info, warning, error, fatal} from '../controllers/errors.controller.js';

const errorRouter = Router();


errorRouter.get('/fatal', fatal);
errorRouter.get('/error', error);
errorRouter.get('/warning', warning);
errorRouter.get('/info', info);
errorRouter.get('/debug', debug);







export default errorRouter;


