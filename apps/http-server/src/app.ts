import { userRouter } from "./routes/userRoutes";

import express from "express";

const PORT = 8000;
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
