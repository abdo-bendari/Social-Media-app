import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import Share from "../../../../database/models/Share.js";
import Post from "../../../../database/models/Post.js";

export const sharePost = catchError(async (req, res, next) => {
    const { postId } = req.body;
    
    const post = await Post.findById(postId);
    if (!post) {
        return next(new AppError("Post not found", 404));
    }
    const newShare = new Share({
        post: postId,
        user: req.user._id,
    });
    await newShare.save();
    res.status(201).json({ message: "Post shared successfully", newShare });
});