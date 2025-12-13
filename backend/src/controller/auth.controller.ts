import { Request, Response } from "express";
import { addUserToStream, generateAvatar, generateJWT } from "../lib/utils.js";
import User from "../model/User.js";

interface RequestWithUser extends Request {
  user?: UserDocument;
}

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

    const avatar = generateAvatar();
    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: avatar,
    });

    await addUserToStream(newUser, "create");

    const token = generateJWT(newUser._id, res);
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

const LogIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Error:All Fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Error:Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ message: "Error:Invalid email or password" });

    const token = generateJWT(user._id, res);
    res.status(201).json({
      success: true,
      message: "User logged in sucessfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const LogOut = async (_req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out sucessfully" });
};

const onBoard = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const userUpdated = await User.findByIdAndUpdate(
      userId,
      { ...req.body, isOnboarded: true },
      { new: true }
    );
    if (!userUpdated)
      return res.status(404).json({ message: "User not found" });

    await addUserToStream(userUpdated, "update");

    res.status(200).json({
      success: true,
      message: "User Updated sucessfully",
      user: userUpdated,
    });
  } catch (error) {
    console.error("Onboarding Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const isAuth = (req: RequestWithUser, res: Response) => {
  res.status(200).json({ succes: true, user: req.user });
};

export { LogIn, LogOut, SignUp };
export { onBoard, isAuth };
