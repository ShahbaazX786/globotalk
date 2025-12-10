import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const SignUp = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Error: All Fields are Required" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Error: Password must be at least 8 characters long",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Error:Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          "Error:User Already Exists, either use another email or try resetting your password.",
      });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      message: "User has been created sucessfully",
      token,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const LogIn = async (_req, res) => {
  res.send("LogIn");
};
const LogOut = async (_req, res) => {
  res.send("LogOut");
};

export { LogIn, LogOut, SignUp };
