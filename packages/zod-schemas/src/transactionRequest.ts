import z from "zod";

export const transactionRequestSchema = z.object({
  receiverAccountNumber: z.number({
    required_error: "receiver account number is required",
  }),
});

export const sendMoneyRequestSchema = z.object({
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, "amount cannot be negative and zero")
    .refine((val) => val >= 1, "amount is required"),
  receiverAccountNumber: z
    .string()
    .length(10, "Invalid account number")
    .regex(/^[0-9]+$/, "Account number must contain only digits"),
});

export const isReceiverUserHaveAccountRequestSchema =
  transactionRequestSchema.pick({
    receiverAccountNumber: true,
  });
