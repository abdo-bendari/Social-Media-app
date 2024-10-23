
import AppError from "./utils/Error.js";
import globalError from "./middleware/globalError.js";
import dbConnection from "../database/dbConnection.js";
import userRouter from "./modules/User/user.routes.js";
import authRouter from "./modules/Auth/auth.routes.js";
import postRouter from "./modules/Post/post.routes.js";
import commentRouter from "./modules/Comment/comment.routes.js";
import ShareRouter from "./modules/Share/share.routes.js";

export const bootstrap = (app, express) => {
  process.on("uncaughtException", (err) => {
    console.log(err);
  });
  
  app.use(express.json());
  dbConnection
  const baseUrl ='/api/v1'
  app.use('/uploads',express.static('uploads'))
  app.use(`${baseUrl}/users`,userRouter)
  app.use(`${baseUrl}/auth`,authRouter)
  app.use(`${baseUrl}/posts`,postRouter)
  app.use(`${baseUrl}/comments`,commentRouter)
  app.use(`${baseUrl}/share`,ShareRouter)
  app.use("*", (req, res, next) => {
    next(new AppError("route not found", 400));
  });
  process.on("unhandledRejection", (err) => {
    console.log(err);
  });
  app.use(globalError);
}