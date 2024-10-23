import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
      min: [1, "Comment text must be at least 1 character"],
      max: [500, "Comment text must be at most 500 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
