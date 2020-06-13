import { model, Schema } from "mongoose";
const {
  Types: { ObjectId },
} = Schema;
const postSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  name: String,
  avatar: String,
  likes: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

export default Post;
