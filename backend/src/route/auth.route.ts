import express from "express";
import { LogIn, LogOut, SignUp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter
  .post("/signup", SignUp)
  .post("/login", LogIn)
  .post("/logout", LogOut);

export default authRouter;
