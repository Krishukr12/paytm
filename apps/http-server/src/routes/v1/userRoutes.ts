import { Router } from "express";
import { userSignIn, userSignUp } from "../../controllers/v1/userController";
import { userLoginSchema, userSchema } from "@repo/zod-schemas/user";
import { validateDataWithZod } from "../../utils";

export const userRouter: Router = Router();

userRouter.post("/signup", validateDataWithZod(userSchema), userSignUp);

userRouter.post("/signin", validateDataWithZod(userLoginSchema), userSignIn);
