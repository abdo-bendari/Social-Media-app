import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema(
  {
    desc: {
      type: String,
      required: [true, "desc is required"],
      min: [2, "min length is 2 character"],
      max: [10000, "max length is 10000 character"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      type: [String],
      default: [],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

postSchema.post("init", function (doc) {
  if (doc.media && Array.isArray(doc.media)) {
    doc.media = doc.media.map(
      (file) => `http://localhost:3000/uploads/posts/${file}`
    );
  }
});
const Post = mongoose.model("Post", postSchema);
export default Post;
