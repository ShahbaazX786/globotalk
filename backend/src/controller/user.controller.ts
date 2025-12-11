import { Response } from "express";
import User from "../model/User.js";

const getRecommendations = async (req: any, res: Response) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error: any) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFriendList = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friendList")
      .populate(
        "friendList",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user?.friendList);
  } catch (error) {}
};

export { getFriendList, getRecommendations };
