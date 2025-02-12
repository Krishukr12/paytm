import { Router } from "express";
import {
  getUserDashboardData,
  userSignIn,
  userSignUp,
} from "../../controllers/v1/userController";
import { userLoginSchema, userSchema } from "@repo/zod-schemas/user";
import { validateDataWithZod } from "../../utils";
import { isUserAuthorized } from "../../middleware/isUserAuthorized";

export const userRouter: Router = Router();

userRouter.post("/signup", validateDataWithZod(userSchema), userSignUp);

userRouter.post("/signin", validateDataWithZod(userLoginSchema), userSignIn);

userRouter.get("/dashboard", isUserAuthorized, getUserDashboardData);
