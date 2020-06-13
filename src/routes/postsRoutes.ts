import { Router } from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  addLikes,
  removeLikes,
  addComment,
  deleteComment,
} from "../controllers/postsController";

const router = Router();
// create post
router.post(
  "/api/post/create",
  auth,
  [check("text", "text is required").not().isEmpty()],
  createPost
);
router.get("/api/posts", auth, getAllPosts);
router.get("/api/posts/:post_id", auth, getPostById);
router.delete("/api/posts/:post_id", auth, deletePost);
router.put("/api/post/like/:post_id", auth, addLikes);
router.put("/api/post/unlike/:post_id", auth, removeLikes);
router.post(
  "/api/post/:post_id/comment",
  auth,
  [check("text", "text is required").not().isEmpty()],
  addComment
);
router.delete("/api/post/:post_id/comment/:comment_id", auth, deleteComment);
export default router;
