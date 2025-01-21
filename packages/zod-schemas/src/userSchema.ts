import z from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z.string(),
  name: z.string(),
  phoneNumber: z.number(),
});

// export type USER = z.infer<typeof userSchema>;
