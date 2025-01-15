import express, { Request, Response } from "express";

const PORT = 8000;

const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("testing router is running fine!");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
