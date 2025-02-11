import z from "zod";

export const transactionRequestSchema = z.object({
  receiverAccountNumber: z.number({
    required_error: "receiver account number is required",
  }),
});

export const sendMoneyRequestSchema = z.object({
  amount: z.string().min(1, "amount is required"),
  receiverAccountNumber: z.string().min(1, "invalid account number"),
});

export const isReceiverUserHaveAccountRequestSchema =
  transactionRequestSchema.pick({
    receiverAccountNumber: true,
  });
