import { config } from "dotenv";
import express from "express";

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("Bismillah");
});

app.get("/api/v1/auth/signup", (_req, res) => {
  res.send("Signup");
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
