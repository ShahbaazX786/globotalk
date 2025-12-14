import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../lib/utils.js";
import { UserDocument } from "../model/User.dto.js";
import User from "../model/User.js";

interface RequestWithUser extends Request {
  user?: UserDocument;
}

const protectRoute = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  try {
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized  - No token provided" });

    const decodedToken: any = decodeToken(token);
    if (!decodeToken)
      return res
        .status(401)
        .json({ message: "Unauthorized  - Invalid token provided" });

    const user: any = await User.findById(decodedToken.userId).select(
      "-password"
    );
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized  - User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default protectRoute;
