import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../utlis/verifyUser.js";

const Router = express.Router();

//  define routes
Router.get("/:id", verifyToken, getMessage);
Router.post("/send/:id", verifyToken, sendMessage);

export default Router;
