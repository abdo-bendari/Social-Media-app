import { Router } from "express";
import protectedRoutes from "../../middleware/authentication.js";
import { sharePost } from "./controller/share.js";
const ShareRouter = Router();

ShareRouter
.post("/", protectedRoutes, sharePost);

export default ShareRouter;
