import { Router } from "express";
import { createUser } from "../controllers/userController";

export const userRouter: Router = Router();

userRouter.get("/signin", createUser);

userRouter.get("/signup", createUser);
