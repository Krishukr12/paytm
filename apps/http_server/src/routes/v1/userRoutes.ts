import { Router } from "express";
import {
  getUserDashboardData,
  userSignIn,
  userSignUp,
} from "../../controllers/v1/userController.js";
import { userLoginSchema, userSchema } from "@repo/zod-schemas/user";
import { isUserAuthorized } from "../../middleware/isUserAuthorized.js";
import { validateDataWithZod } from "../../utils/validateWithZod.js";

export const userRouter: Router = Router();

userRouter.post("/signup", validateDataWithZod(userSchema), userSignUp);

userRouter.post("/signin", validateDataWithZod(userLoginSchema), userSignIn);

userRouter.get("/dashboard", isUserAuthorized, getUserDashboardData);
