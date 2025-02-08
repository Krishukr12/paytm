import z from "zod";

export const userAuthResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string(),
});

export const userLoginResponseSchema = userAuthResponseSchema.pick({
  token: true,
  success: true,
  message: true,
});

export const userSignUpResponseSchema = userAuthResponseSchema.pick({
  success: true,
  message: true,
});
