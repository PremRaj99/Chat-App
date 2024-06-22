import User from "../models/user.model.js";
import { errorHandler } from "../utlis/error.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utlis/generateToken.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return next(errorHandler(400, "Passwords do not match"));
    }
    if (!fullName || !username || !email || !password || !gender) {
      return next(errorHandler(400, "All fields are required"));
    }

    const user = await User.findOne({ username });

    if (user) {
      return next(errorHandler(403, "Username already exist"));
    }

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(errorHandler(403, "Your e-mail already registered"));
    }

    // hash password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const boyProfilePicture =
      "https://avatar.iran.liara.run/public/boy?username=" + username;
    const girlProfilePicture =
      "https://avatar.iran.liara.run/public/girl?username=" + username;
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });
    generateTokenAndSetCookie(newUser._id, res);
    const data = await newUser.save();

    const { password: pass, ...rest } = data._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const verifyPassword = bcryptjs.compareSync(password, user?.password || "");
    if (!verifyPassword) {
      return next(errorHandler(401, "Invalid password"));
    }

    generateTokenAndSetCookie(user._id, res);
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
