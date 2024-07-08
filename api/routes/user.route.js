import express from "express";
import { getUser, getUserForSideBar } from "../controllers/user.controller.js";
import { verifyToken } from "../utlis/verifyUser.js";

const Router = express.Router();

//  define routes
Router.get("/", verifyToken, getUserForSideBar);
Router.get("/:senderId", verifyToken, getUser);

export default Router;
