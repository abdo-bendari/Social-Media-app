import { Router } from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";
import * as C  from "./controller/comment.js";
import validation from "../../middleware/validation.js";
import commentValidationSchema from "./comment.validation.js";


const commentRouter = Router()
commentRouter.use(protectedRoutes,allowedTo('user','admin'))
commentRouter
.post('/',validation(commentValidationSchema),C.createComment)
.get('/:id',C.getCommentsByPost)
.patch('/:id',C.updateComment)
.delete('/:id',C.deleteComment)

export default commentRouter