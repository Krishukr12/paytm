import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

/**
 * Validates data against a given Zod schema and returns errors if validation fails.
 *
 * @param schema - The Zod schema to validate against
 */

export const validateDataWithZod = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);

    if (validation.success) {
      return next();
    }
    const errors = validation.error.errors.map((err) => {
      const path =
        err.path.length > 0 ? `Path: ${err.path.join(" -> ")}` : "Root";
      return `${path}: ${err.message}`;
    });
    res.send({
      success: false,
      error: errors,
    });
  };
};
