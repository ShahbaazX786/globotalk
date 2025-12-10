import { config } from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import authRoutes from "./route/auth.route.js";

config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("Bismillah");
});

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server Running on port ${PORT}`);
});
