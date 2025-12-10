import express from "express";
import { LogIn, LogOut, SignUp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/signup", SignUp).get("/login", LogIn).get("/logout", LogOut);

export default authRouter;
