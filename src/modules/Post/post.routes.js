import { Router } from "express";
import * as P from "./controller/post.js";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";
import postValidationSchema from "./post.validation.js";
const postRouter = Router()
postRouter.use(protectedRoutes,allowedTo('user','admin'))
postRouter
.post('/', uploadSingleFile('media', 'posts'),validation(postValidationSchema),P.createPost)
.put('/:id/', uploadSingleFile('media', 'posts'),P.updatePost)
.get('/',P.allPosts)
.get('/:id',P.getPostWithComments)
.delete('/:id',P.deletePost)
.put('/:id/like',P.likePost)
.put('/:id/unlike',P.unlikePost)
.get('/:id/likes',P.getLikes)
.get('/timeline/all',P.getTimelinePosts)
export default postRouter