import express from "express";
import {
  getFriendList,
  getRecommendations,
} from "../controller/user.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(protectRoute);
userRouter.post("/", getRecommendations).post("/friends", getFriendList);

export default userRouter;
