import { RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import {
  Ireq,
  IUser,
  IPost,
  TLike,
  TComment,
} from "../typesAndInterfaces/types";
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
    error.message = "no user";
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
    error.message = "invalid post id";
    next(error);
  }
};
// add likes
const addLikes: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (p: any) => void
) => {
  const { post_id } = req.params;
  try {
    const post = (await Post.findById(post_id)) as IPost;
    const filteredLikes = post.likes.filter(
      (like: TLike) => like.user.toString() === req.user.id
    );
    if (filteredLikes.length > 0) {
      return res.status(401).json({ error: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    error.message = "invalid post id";
    next(error);
  }
};
// remove likes or unlike
const removeLikes: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (p: any) => void
) => {
  const { post_id } = req.params;
  try {
    const post = (await Post.findById(post_id)) as IPost;
    const filteredLikes = post.likes.filter(
      (like: TLike) => like.user.toString() === req.user.id
    );
    if (filteredLikes.length === 0) {
      return res.status(401).json({ error: "post not liked yet" });
    }
    let unlikes = post.likes.filter(
      (like: TLike) => like.user.toString() !== req.user.id
    );
    post.likes = unlikes;
    await post.save();
    res.json(post.likes);
  } catch (error) {
    error.message = "invalid post id";
    next(error);
  }
};
// add comment
const addComment: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (p: any) => void
) => {
  const { post_id } = req.params;
  const { text } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array() });
  }
  try {
    const user = (await User.findById(req.user.id)) as IUser;
    const post = (await Post.findById(post_id)) as IPost;
    const comment = {
      text,
      user: req.user.id,
      avatar: user.avatar,
      name: user.name,
    } as TComment;
    post.comments.unshift(comment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    error.message = "invalid post id";
    next(error);
  }
};
// delete comment
const deleteComment: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: (p: any) => void
) => {
  const { post_id } = req.params;
  const { comment_id } = req.params;
  try {
    const post = (await Post.findById(post_id)) as IPost;
    const comment = post.comments.find(
      (comment: TComment) => comment.id === comment_id
    );

    if (!comment) {
      return res.status(401).json({ error: "no comment matches your request" });
    }
    // console.log(deletedComment === undefined);
    if (comment?.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: "not allowed to delete this comment" });
    }
    const filtredComments = post.comments.filter(
      (comment: TComment) => comment.id !== comment_id
    );
    post.comments = filtredComments;
    await post.save();
    res.json(post.comments);
  } catch (error) {
    error.message = "there is no post match your request";
    next(error);
  }
};
export {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  addLikes,
  removeLikes,
  addComment,
  deleteComment,
};
