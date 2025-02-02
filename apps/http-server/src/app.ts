import express from "express";
import cors from "cors";

import { userRouter } from "./routes/v1/userRoutes";
import { globalErrorHandler } from "./utils/errorHandler";

const PORT = 8000;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/v1/user", userRouter);

// Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server started successfully!`);
  console.log(`🌐 Server is running on http://localhost:${PORT}`);
});
