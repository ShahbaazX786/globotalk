import { config } from "dotenv";
import express from "express";
import authRoutes from "./route/auth.route.js";

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("Bismillah");
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
