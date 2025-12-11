import express from "express";
import {
  LogIn,
  LogOut,
  onBoard,
  SignUp,
} from "../controller/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter
  .post("/signup", SignUp)
  .post("/login", LogIn)
  .post("/logout", LogOut)
  .post("/onboard", protectRoute, onBoard);

export default authRouter;
