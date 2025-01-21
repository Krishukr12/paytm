import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { client } from "@repo/db/client";

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, password, name } = req.body;

    const isUserExist = await client.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      res.status(400).json({
        success: false,
        message: "user already exist",
      });
      return;
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

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: { email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const userSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await client.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "signed in successfully",
      token,
    });
  } catch (error) {
    console.error("Error in userSignIn:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
