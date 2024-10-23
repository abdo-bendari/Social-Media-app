import e from "express";
import Comment from "../../../../database/models/Comment.js";
import Post from "../../../../database/models/Post.js";
import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";



export const createComment = catchError(async (req, res, next) => {
    const { text, post } = req.body;
    const existingPost = await Post.findById(post);
    if (!existingPost) {
        return next(new AppError("Post not found", 404));
    }
    const newComment = new Comment({
        text,
        user: req.user._id,
        post,
    });
     existingPost.comments.push(newComment);
    await existingPost.save();
    await newComment.save();
    res.status(201).json({ message: "Comment created successfully", newComment });
});

export const getCommentsByPost = catchError(async (req, res, next) => {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
        return next(new AppError("Post not found", 404));
    }
    const comments = await Comment.find({ post: req.params.id })
    res.status(200).json({ message: "Comments fetched successfully", comments });
});

export const updateComment = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
        return next(new AppError("Comment not found", 404));
    }

    if (comment.user.toString() !== req.user._id.toString()) {
        return next(new AppError("You can only update your own comments", 403));
    }
    comment.text = text;
    await comment.save();
    res.status(200).json({ message: "Comment updated successfully", comment });
});

// export const deleteComment = catchError(async (req, res, next) => {
//     const { id } = req.params;
//     const comment = await Comment.findByIdAndDelete(id);
//     if (!comment) {
//         return next(new AppError("Comment not found", 404));
//     }
//     if (comment.user.toString() !== req.user._id.toString()) {
//         return next(new AppError("You can only delete your own comments", 403));
//     }
//     const post = await Post.findById(comment.post);
//     post.comments.splice(post.comments.indexOf(comment), 1);
//     await post.save();
//     await comment.save();
//     res.status(200).json({ message: "Comment deleted successfully", post });
// });
export const deleteComment = catchError(async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
        return next(new AppError("Comment not found", 404));
    }
    if (comment.user.toString() !== req.user._id.toString()) {
        return next(new AppError("You can only delete your own comments", 403));
    }
    await Comment.findByIdAndDelete(id); 
    const post = await Post.findById(comment.post);
        post.comments.pull(comment._id);
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully", post });
});

