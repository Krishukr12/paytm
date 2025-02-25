import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createError } from "../utils/createError.js";

export const isUserAuthorized = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers["authorization"];

    if (!authToken) {
      next(createError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
      return;
    }

    const token = authToken.startsWith("Bearer ")
      ? authToken.slice(7)
      : authToken;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decodedToken;

    next();
  } catch (error) {
    next(
      createError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Invalid authorization token"
      )
    );
  }
};
