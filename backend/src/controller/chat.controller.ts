import { Response } from "express";
import { generateStreamToken } from "../lib/stream.js";

const getStreamToken = async (req: any, res: Response) => {
  try {
    const token = generateStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error: any) {
    console.error("Error in getStreamToken controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getStreamToken };
