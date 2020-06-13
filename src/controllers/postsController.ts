import { RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import { Ireq, IUser, IPost } from "../typesAndInterfaces/types";
import Post from "../models/Post";
import User from "../models/User";
import Profile from "../models/Profile";
// create post

const createPost: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array() });
  }
  try {
    const user = (await User.findById(req.user.id).select(
      "-password"
    )) as IUser;
    const { text } = req.body;
    const post = await Post.create({
      user: req.user.id,
      text,
      name: user.name,
      avatar: user.avatar,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};
// get all posts
const getAllPosts: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (param: any) => void
) => {
  try {
    const posts = await Post.find({});
    if (!posts) {
      return res.status(401).json({ error: "no posts created" });
    }
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
// get a specific post by id
const getPostById: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (param: any) => void
) => {
  const { post_id } = req.params;
  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(401)
        .json({ error: "there is no post belong to that user" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};
// delete post
const deletePost: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (param: any) => void
) => {
  const { post_id } = req.params;
  try {
    const post = (await Post.findById(post_id)) as IPost;
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "access denied" });
    }
    await post?.remove();
    res.json({ message: "Post Removed" });
  } catch (error) {
    next(error);
  }
};
export { createPost, getAllPosts, getPostById, deletePost };
