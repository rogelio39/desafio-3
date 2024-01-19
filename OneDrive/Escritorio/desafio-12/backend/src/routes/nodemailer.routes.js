import { Router } from "express";
import { nodemailerSend } from "../controllers/nodemailer.controller.js";


const nodemailerRouter = Router();

nodemailerRouter.get('/', nodemailerSend);

export default nodemailerRouter