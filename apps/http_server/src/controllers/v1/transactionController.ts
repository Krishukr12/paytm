import { NextFunction, Request, Response } from "express";
import { accountStatus } from "@repo/const/accountStatus";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client/extension";
import { createError } from "../../utils/createError.js";
import { prismaClient } from "@repo/db/client";

export const sendMoney = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, receiverAccountNumber } = req.body;
    //@ts-ignore
    const { userId } = req.user;

    const senderUser = await prismaClient.user.findUnique({
      where: {
        userId,
      },
      select: {
        AccountDetails: true,
      },
    });

    if (!senderUser?.AccountDetails) {
      next(createError(StatusCodes.BAD_REQUEST, "something went wrong"));
      return;
    }
    if (senderUser?.AccountDetails?.accountBalance < amount) {
      next(createError(StatusCodes.BAD_REQUEST, "insufficient balance"));
      return;
    }

    const transactionResponse = await prismaClient.$transaction(
      async (tx: PrismaClient) => {
        //Todo: need to remove receiverUser from the transaction as soon as will make user account number unique
        const receiverUser = await tx.user.findFirst({
          where: {
            AccountDetails: {
              accountNumber: receiverAccountNumber,
            },
          },
        });

        if (!receiverUser) {
          next(createError(StatusCodes.NOT_FOUND, "receiver not found"));
          return;
        }

        const senderUserUpdate = await tx.user.update({
          where: {
            userId,
          },
          data: {
            AccountDetails: {
              update: {
                accountBalance: { decrement: amount },
              },
            },
          },
        });

        const receiverUserUpdate = await tx.user.update({
          where: {
            userId: receiverUser.userId,
          },
          data: {
            AccountDetails: {
              update: {
                accountBalance: { increment: amount },
              },
            },
          },
        });

        // create transaction history
        // const transactionHistory = await tx.transactionHistory.create({
        //   data: {
        //     amount: transferAmount,
        //     senderAccountId: senderUser.AccountDetails.accountNumber,
        //   },
        // });

        return { senderUserUpdate, receiverUserUpdate };
      }
    );

    if (transactionResponse) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: "money transferred successfully",
        data: transactionResponse,
      });
    } else {
      next(createError(StatusCodes.BAD_REQUEST, "transaction failed"));
    }
  } catch (error) {
    next(
      createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
    );
  }
};

export const isReceiverUserHaveAccount = async (
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
      select: {
        status: true,
      },
    });
    if (response?.status === accountStatus.active) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: "user have account",
      });
      return;
    }
    return next(createError(StatusCodes.NOT_FOUND, "user not found"));
  } catch (error) {
    next(
      next(
        createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
      )
    );
  }
};
