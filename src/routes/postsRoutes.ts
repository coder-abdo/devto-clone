import { Router } from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
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
export default router;
