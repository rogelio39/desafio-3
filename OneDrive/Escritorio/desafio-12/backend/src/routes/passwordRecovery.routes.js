import { Router } from "express";
import { passwordRecovery, resetPassword } from "../controllers/passwordRecovery.js";

const passwordRecoveryRouter = Router();


passwordRecoveryRouter.post('/recovery', passwordRecovery);
passwordRecoveryRouter.post('/reset/:token', resetPassword);

export default passwordRecoveryRouter;