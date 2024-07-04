import express from "express";
import { getUserForSideBar } from "../controllers/user.controller.js";
import { verifyToken } from "../utlis/verifyUser.js";

const Router = express.Router();

//  define routes
Router.get("/", verifyToken, getUserForSideBar);

export default Router;
