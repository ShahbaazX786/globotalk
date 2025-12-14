import express from "express";
import { getStreamToken } from "../controller/chat.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.get("/token", protectRoute, getStreamToken);

export default chatRouter;
