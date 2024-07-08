import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res, next) => {
  try {
    const logedInUserId = req.user.id;
    const allUsers = await User.find({ _id: { $ne: logedInUserId } }).select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.senderId).select("-password");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
