import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { client } from "@repo/db/client";
import { createError } from "../../utils/createError";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET ?? "kjsdfkjsdfkjsdfkjsdfkjsdf";

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber, password, name } = req.body;

    const existingUser = await client.user.findFirst({
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

    const newUser = await client.user.create({
      data: {
        email,
        phoneNumber,
        password: hashedPassword,
        name,
        AccountDetails: {
          create: {
            accountBalance: 0,
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
    const user = await client.user.findUnique({
      where: { email },
    });

    if (!user) {
      next(createError(StatusCodes.NOT_FOUND, "user not found"));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      next(createError(StatusCodes.UNAUTHORIZED, "invalid email or password"));
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
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
