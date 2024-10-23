import User from "../../database/models/User.js";
import AppError from "../utils/Error.js";

export const checkEmail = async (req, res, next) => {
  let isExist = await User.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("email already exist", 409));
  next();
};
