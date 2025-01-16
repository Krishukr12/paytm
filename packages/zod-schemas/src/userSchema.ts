import z from "zod";

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// export type USER = z.infer<typeof userSchema>;
