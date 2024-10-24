import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is unique"],
      min: [2, "min length is 2 character"],
      max: [50, "max length is 50 character"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    desc: {
      type: String,
      max: [100, "max length is 100 character"],
    },
    from: String,
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Post",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

const User = mongoose.model("User", userSchema);
export default User;
