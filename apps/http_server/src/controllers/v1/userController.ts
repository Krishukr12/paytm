import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createError } from "../../utils/createError.js";
import { prismaClient } from "@repo/db/client";

const JWT_SECRET = process.env.JWT_SECRET ?? "kjsdfkjsdfkjsdfkjsdfkjsdf";

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber, password, name } = req.body;

    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    const errors: string[] = [];

    if (existingUser) {
      if (existingUser.email === email) errors.push("Email already exists");
      if (existingUser.phoneNumber === phoneNumber)
        errors.push("Phone number already exists");

      return next(createError(StatusCodes.CONFLICT, errors.join(", ")));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        email,
        phoneNumber,
        password: hashedPassword,
        name,
        AccountDetails: {
          create: {
            accountBalance: 0,
            accountNumber: phoneNumber,
          },
        },
      },
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "user created successfully",
      user: { email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    next(
      createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
    );
  }
};

export const userSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      next(createError(StatusCodes.NOT_FOUND, "user not found"));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      next(createError(StatusCodes.UNAUTHORIZED, "invalid email or password"));
      return;
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        accountNumber: user.phoneNumber,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: "signed in successfully",
      token,
    });
  } catch (error) {
    next(
      createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
    );
  }
};

export const getUserDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const { userId } = req.user;

    const user = await prismaClient.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        email: true,
        name: true,
        AccountDetails: true,
        TransactionHistory: true,
        password: false,
      },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Account details fetched successfully",
      data: user,
    });
  } catch (error) {
    next(
      createError(StatusCodes.INTERNAL_SERVER_ERROR, "internal server error")
    );
  }
};
