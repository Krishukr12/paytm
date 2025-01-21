import { Request, Response } from "express";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  res.send({
    success: false,
    message: "working fine",
  });
};
