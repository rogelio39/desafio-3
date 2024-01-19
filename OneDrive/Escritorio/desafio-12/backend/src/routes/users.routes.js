import { Router } from "express";
import { getUser, getUsers, putUser, deleteUser } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser)
userRouter.put('/:id', putUser)
userRouter.delete('/:id', deleteUser)

export default userRouter;