import express from "express";
import {
  acceptFriendRequest,
  getFriendList,
  getRecommendations,
  sendFriendRequest,
} from "../controller/user.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(protectRoute);
userRouter.post("/", getRecommendations).post("/friends", getFriendList);

userRouter
  .route("/friend-req/:id")
  .post(sendFriendRequest)
  .put(acceptFriendRequest);

export default userRouter;
