import AppError from "../utils/Error.js";
import catchError from "./catchError.js";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";

const protectedRoutes = catchError(async (req, res, next) => {
  // authentication
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("token not provided"));
  jwt.verify(token, "social-app", (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("user not found", 400));
  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  // authorization
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(
      new AppError("you are not authorized to access this endpoint", 401)
    );
  });
};

export default protectedRoutes;
