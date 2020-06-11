import { Router } from "express";
import { check } from "express-validator";
import {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
} from "../controllers/profileController";
import auth from "../middlewares/auth";

const router = Router();

router.get("/api/profile/me", auth, getProfile);
router.get("/api/profile", getAllProfiles);
router.get("/api/profile/user/:user_id", getProfileByUserId);
router.post(
  "/api/profile/create",
  auth,
  [
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills are required").not().isEmpty(),
  ],
  createProfile
);
router.delete("/api/profile/delete", auth, deleteProfile);
export default router;
