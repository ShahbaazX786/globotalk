import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./lib/db.js";
import authRoutes from "./route/auth.route.js";
import chatRoutes from "./route/chat.route.js";
import userRoutes from "./route/user.route.js";

config();
const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

app.get("/status", (_req, res) => {
  res.send("Bismillah");
});

app.use(cors({ origin: process.env.ORIGIN!, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server Running on port ${PORT}`);
});
