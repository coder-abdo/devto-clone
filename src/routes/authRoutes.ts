import { Router } from "express";
import { getAuth } from "../controllers/authController";
import auth from "../middlewares/auth";

const router = Router();

router.get("/api/auth", auth, getAuth);

export default router;
