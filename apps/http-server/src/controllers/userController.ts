import { userSchema } from "@repo/zod-schemas/user";
import { NextFunction, Request, Response } from "express";

export const userSignIn = (req: Request, res: Response, next: NextFunction) => {
  res.send("create user ");
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // check user is already exist
    //create an user and save email and pass
    //and return message with successful
    // const isUserExist = await UserModel.find({ email });
    const isUserExist = false;
    if (isUserExist) {
      res.status(400).send({
        success: false,
        message: "user already exist",
      });
      return;
    }
    // const newUser = await new UserModel.create({ email, password });
    // await new UserModel.create({ email, password });
    res.status(200).send({
      success: true,
      message: "logged in successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
