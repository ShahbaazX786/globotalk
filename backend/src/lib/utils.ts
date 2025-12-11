import { Response } from "express";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "./stream.js";

const generateAvatar = () => {
  const idx = Math.floor(Math.random() * 100) + 1;
  const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
  return randomAvatar;
};

const generateJWT = (userId: any, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

const addUserToStream = async (newUser: any, type: string) => {
  const msg = type === "update" ? "Stream User Update" : "Stream User Create";
  try {
    await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });
    console.log(`STREAM: ${msg} for ${newUser.fullName}`);
  } catch (error) {
    console.log("Error while ${msg}:", error);
  }
};

const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};

export { addUserToStream, decodeToken, generateAvatar, generateJWT };
