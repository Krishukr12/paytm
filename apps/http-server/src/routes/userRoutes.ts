import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/userController";
import { userSchema } from "@repo/zod-schemas/user";
import { validateDataWithZod } from "../utils/validateWithZod";

export const userRouter: Router = Router();

userRouter.post("/signin", validateDataWithZod(userSchema), userSignIn);

userRouter.post("/signup", validateDataWithZod(userSchema), userSignUp);
