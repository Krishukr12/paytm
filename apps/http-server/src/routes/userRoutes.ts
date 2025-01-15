import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/userController";

export const userRouter: Router = Router();

userRouter.post("/signin", userSignIn);

userRouter.post("/signup", userSignUp);
