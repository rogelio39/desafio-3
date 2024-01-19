import { Router } from "express";
import {getProducts ,getProductById, postProduct, putProduct, deleteProduct } from "../controllers/products.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const productRouter = Router();


productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById);
productRouter.post('/', passportError('jwt'), authorization('user'), postProduct);
productRouter.put('/:id', passportError('jwt'), authorization('user'), putProduct);
productRouter.delete('/:id', passportError('jwt'), authorization('user'), deleteProduct);




export default productRouter;