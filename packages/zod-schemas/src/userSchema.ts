import z from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email address" }),
  password: z
    .string()
    .min(1, { message: "password is required" })
    .min(8, "password must be at least 8 characters long")
    .max(32, "password must be at most 32 characters long")
    .regex(/[A-Z]/, "password must include at least one uppercase letter")
    .regex(/[a-z]/, "password must include at least one lowercase letter")
    .regex(/\d/, "password must include at least one digit")
    .regex(/[@$!%*?&]/, "password must include at least one special character")
    .regex(/^\S+$/, "password must not contain spaces"),
  name: z.string().min(3, "name should be min 3 character long"),
  phoneNumber: z
    .string()
    .min(1, { message: "phone number is required" })
    .regex(/^(?:\+91[-\s]?)?[6-9]\d{9}$/, "invalid indian phone number"),
});

export const UserLoginSchema = userSchema.pick({ email: true, password: true });
