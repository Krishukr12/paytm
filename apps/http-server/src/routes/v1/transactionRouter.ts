import { isReceiverUserHaveAccountRequestSchema } from "@repo/zod-schemas/transactionRequest";
import { Router } from "express";
import {
  isReceiverUserHaveAccount,
  sendMoney,
} from "../../controllers/v1/transactionController";
import { validateDataWithZod } from "../../utils";
import { isReceiverUserExistAndActive } from "../../middleware/isReceiverUserExist";
import { isUserAuthorized } from "../../middleware/isUserAuthorized";

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
