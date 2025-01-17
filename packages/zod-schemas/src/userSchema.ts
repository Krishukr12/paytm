import z from "zod";

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  phoneNumber: z.number(),
});

// export type USER = z.infer<typeof userSchema>;
