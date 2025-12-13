import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import authRoutes from "./route/auth.route.js";
import cors from "cors";

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("Bismillah");
});

app.use(cors({ origin: process.env.ORIGIN!, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server Running on port ${PORT}`);
});
