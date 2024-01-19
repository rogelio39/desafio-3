import { Router } from "express";
import { deleteCart, deleteProdCart, getCart, postCart, putProductToCart, putUpdatedQuantityProductToCart} from "../controllers/cart.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const cartRouter = Router();

cartRouter.get('/:cid', passportError('jwt'), authorization('user'), getCart);
cartRouter.post('/:cid/product/:pid', passportError('jwt'), authorization('user'), postCart);
cartRouter.put('/:cid', passportError('jwt'), authorization('user'), putProductToCart);
cartRouter.put('/:cid/product/:pid', passportError('jwt'), authorization('user'), putUpdatedQuantityProductToCart);
cartRouter.delete('/:cid/product/:pid', passportError('jwt'), authorization('user'), deleteProdCart);
cartRouter.delete('/:cid', passportError('jwt'), authorization('user'), deleteCart)



export default cartRouter;