import "dotenv/config";
import express from "express";
import cors from "cors";

import { userRouter } from "./routes/v1/userRoutes.js";
import { globalErrorHandler } from "./utils/errorHandler.js";
import { transactionRouter } from "./routes/v1/transactionRouter.js";

const PORT = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to the bank");
});

app.use("/api/v1/user", userRouter);

app.use("/api/v1/transaction", transactionRouter);

// Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server started successfully!`);
  console.log(`🌐 Server is running on http://localhost:${PORT}`);
});
