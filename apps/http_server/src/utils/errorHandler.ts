import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
export interface IError extends Error {
  status: number;
  message: string;
}

export const globalErrorHandler = (
  error: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorStatus = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = error.message || "something went wrong";
  res.status(errorStatus).send({
    success: false,
    message: errorMessage,
  });
};
