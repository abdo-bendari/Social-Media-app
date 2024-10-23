import { Router } from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";
import * as U from "./controller/user.js";

const userRouter = Router()

userRouter
.put('/',protectedRoutes,U.updateUser)
.delete('/:id',protectedRoutes,allowedTo('admin'),U.deleteUser)
.get('/:id',protectedRoutes,U.getUser)
.get('/',protectedRoutes,allowedTo('admin'),U.allUsers)
.put('/:id/follow',protectedRoutes,U.follow)
.put('/:id/unFollow',protectedRoutes,U.unFollow)

export default userRouter