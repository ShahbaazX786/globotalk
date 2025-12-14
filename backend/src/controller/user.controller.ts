import { Response } from "express";
import FriendRequest from "../model/FriendRequest.js";
import User from "../model/User.js";

const getRecommendations = async (req: any, res: Response) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
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
  } catch (error: any) {
    console.error("Error in getFriendList controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendFriendRequest = async (req: any, res: Response) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId)
      return res
        .status(400)
        .json({ message: "You cant send friend request to yourself" });

    const recipient = await User.findById(recipientId);
    if (!recipient)
      return res.status(404).json({ message: "Recipient not found" });

    if (recipient.friendList?.includes(myId))
      return res.status(400).json({ message: "You two are already friends" });

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest)
      return res
        .status(400)
        .json({ message: "A pending request is already there bro" });

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error: any) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const acceptFriendRequest = async (req: any, res: Response) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest)
      return res.status(404).json({ message: "Friend request not found" });
    if (friendRequest.recipient.toString() !== req.user.id.toString())
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });

    friendRequest.status = "accepted";
    await friendRequest.save();
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friendList: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friendList: friendRequest.sender },
    });
  } catch (error: any) {
    console.error("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFriendRequests = async (req: any, res: Response) => {
  try {
    const pendingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ pendingReqs, acceptedReqs });
  } catch (error: any) {
    console.error("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSentFriendRequests = async (req: any, res: Response) => {
  try {
    const sentFriendReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json({ sentFriendReqs });
  } catch (error: any) {
    console.error(
      "Error in getOutgoingFriendRequests controller",
      error.message
    );
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  acceptFriendRequest,
  getFriendList,
  getFriendRequests,
  getSentFriendRequests,
  getRecommendations,
  sendFriendRequest,
};
