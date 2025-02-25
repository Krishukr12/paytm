import { isReceiverUserHaveAccountRequestSchema } from "@repo/zod-schemas/transactionRequest";
import { Router } from "express";
import {
  isReceiverUserHaveAccount,
  sendMoney,
} from "../../controllers/v1/transactionController.js";
import { isReceiverUserExistAndActive } from "../../middleware/isReceiverUserExist.js";
import { isUserAuthorized } from "../../middleware/isUserAuthorized.js";
import { validateDataWithZod } from "../../utils/validateWithZod.js";

export const transactionRouter: Router = Router();

transactionRouter.post(
  "/send-money",
  validateDataWithZod(isReceiverUserHaveAccountRequestSchema),
  isReceiverUserExistAndActive,
  isUserAuthorized,
  sendMoney
);

transactionRouter.post(
  "/is-receiver-user-have-account",
  validateDataWithZod(isReceiverUserHaveAccountRequestSchema),
  isReceiverUserHaveAccount
);
