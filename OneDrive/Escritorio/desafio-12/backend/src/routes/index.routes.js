import { Router } from "express";
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import userRouter from './users.routes.js';
import sessionRouter from './session.routes.js';
import checkoutRouter from "./checkout.routes.js";
import nodemailerRouter from "./nodemailer.routes.js";
import errorRouter from "./error.routes.js";
import passwordRecoveryRouter from "./passwordRecovery.routes.js";
import operacionesRouter from "./operaciones.routes.js";



const router = Router();

router.use('/api/users', userRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/api/session', sessionRouter);
router.use('/api/carts/checkout', checkoutRouter);
router.use('/api/mail', nodemailerRouter);
router.use('/api/errors', errorRouter);
router.use('/api/password', passwordRecoveryRouter);
router.use('/api', operacionesRouter);



export default router;