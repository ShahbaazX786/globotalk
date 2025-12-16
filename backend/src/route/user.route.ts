import express from "express";
import {
  acceptFriendRequest,
  getFriendList,
  getFriendRequests,
  getRecommendations,
  getSentFriendRequests,
  sendFriendRequest,
} from "../controller/user.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(protectRoute);

userRouter
  .get("/recommendations", getRecommendations)
  .get("/friends", getFriendList)
  .get("/friend-requests", getFriendRequests)
  .get("/sent-friend-requests", getSentFriendRequests);
userRouter
  .route("/friend-request/:id")
  .get(sendFriendRequest)
  .put(acceptFriendRequest);

export default userRouter;
