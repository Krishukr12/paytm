import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { accountStatus } from "@repo/const/accountStatus";
import { createError } from "../utils/createError.js";
import { prismaClient } from "@repo/db/client";

export const isReceiverUserExistAndActive = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { receiverAccountNumber } = req.body;
    //@ts-ignore
    const { userId } = req.user;

    // Get sender's account details
    const senderUser = await prismaClient.user.findUnique({
      where: {
        userId,
      },
      select: {
        AccountDetails: true,
      },
    });

    // Get receiver's details
    const receiverUser = await prismaClient.user.findFirst({
      where: {
        AccountDetails: {
          accountNumber: `${receiverAccountNumber}`,
        },
      },
    });

    if (
      Number(senderUser?.AccountDetails?.accountNumber) ===
      receiverAccountNumber
    ) {
      next(
        createError(
          StatusCodes.BAD_REQUEST,
          "You cannot transfer money to your own account",
        ),
      );
      return;
    }

    if (receiverUser?.status === accountStatus.active) {
      next();
      return;
    } else {
      next(
        createError(
          StatusCodes.NOT_FOUND,
          "The recipient's bank details are incorrect or do not exist",
        ),
      );
      return;
    }
  } catch (error) {
    next(
      createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error"),
    );
  }
};
