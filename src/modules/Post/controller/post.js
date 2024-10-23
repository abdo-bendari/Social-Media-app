import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import Post from "../../../../database/models/Post.js";
import User from "../../../../database/models/User.js";
import fs from "fs";
import path from "path";

export const createPost = catchError(async (req, res, next) => {
  if (req.file) req.body.media = req.file.filename;
  const newPost = new Post({
    ...req.body,
    user: req.user._id,
  });
  const updateUser = await User.findByIdAndUpdate(req.user._id, {
    $push: { posts: newPost._id },
  });
  await newPost.save();
  return res.status(201).json({ message: "done", newPost });
});

export const updatePost = catchError(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(new AppError('Post not found', 404));
    }
    if (req.file) {
        if (Array.isArray(post.media)) {
            await Promise.all(post.media.map(async (mediaItem) => {
                const oldMediaPath = path.join('uploads/posts', mediaItem);
                try {
                     fs.unlink(oldMediaPath);
                } catch (err) {
                    console.error(`Error deleting old media: ${oldMediaPath}`, err);
                }
            }));
        }
        req.body.media = [req.file.filename];
    }
    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedPost) {
        return next(new AppError('you can update only your posts', 404));
    }
    res.status(201).json({ message: 'done', post: updatedPost });
});

export const allPosts = catchError(async (req, res, next) => {
  const posts = await Post.find({ user: req.user._id });
  return posts.length == 0
    ? next(new AppError("no found any posts ", 404))
    : res.status(201).json({ message: "done", posts });
});

export const getPostWithComments = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");
  return !post
    ? next(new AppError(" post not found", 404))
    : res.status(201).json({ message: "done", post });
});

export const deletePost = catchError(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppError("you can delete only your posts", 404));
  }
  res.status(201).json({ message: "done", post });
});

export const likePost = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("post not found", 404));
  if (post.likes.includes(req.user._id))
    return next(new AppError("you already liked this post", 404));
  post.likes.push(req.user._id);
  await post.save();
  return res.status(201).json({ message: "done", post });
});

export const unlikePost = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("post not found", 404));
  if (!post.likes.includes(req.user._id))
    return next(new AppError("you already un liked this post", 404));
  post.likes.splice(post.likes.indexOf(req.user._id), 1);
  await post.save();
  return res.status(201).json({ message: "done", post });
});

export const getLikes = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("post not found", 404));      
  return res.status(201).json({ message: "done", likes: post.likes });
});

export const timeline = catchError(async (req, res, next) => {
  const posts = await Post.find();
  return posts.length == 0
   ? next(new AppError("no found any posts ", 404))
    : res.status(201).json({ message: "done", posts });     
});

export const getTimelinePosts = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const currentUser = await User.findById(userId).populate('following');
    if (!currentUser) {
        return next(new AppError('User not found', 404));
    }
    const followingPosts = await Post.find({
        user: { $in: currentUser.following }
    }).populate('user', 'name profilePic');
    const userPosts = await Post.find({ user: userId }).populate('user', 'name profilePic');
    const timelinePosts = [...followingPosts, ...userPosts];
    res.status(200).json({ message: 'Timeline fetched successfully', timelinePosts });
});

 
