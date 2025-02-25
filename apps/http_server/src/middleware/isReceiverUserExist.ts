import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { accountStatus } from "@repo/const/accountStatus";
import { createError } from "../utils/createError.js";
import { prismaClient } from "@repo/db/client";

export const isReceiverUserExistAndActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiverAccountNumber } = req.body;
    const response = await prismaClient.user.findFirst({
      where: {
        AccountDetails: {
          accountNumber: receiverAccountNumber,
        },
      },
    });
    if (response?.status === accountStatus.active) {
      next();
      return;
    } else {
      next(createError(StatusCodes.NOT_FOUND, "invalid user"));
      return;
    }
    console.log("reaching to end of user exist middleware");
  } catch (error) {
    next(
      createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
    );
  }
};
