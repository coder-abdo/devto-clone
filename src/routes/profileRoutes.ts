import { Router } from "express";
import { check } from "express-validator";
import {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
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
router.put(
  "/api/profile/experience",
  auth,
  [
    check("title", "title is required").not().isEmpty(),
    check("company", "company is required").not().isEmpty(),
    check("from", "from is required").not().isEmpty(),
    check("current", "current is required").not().isEmpty(),
  ],
  addExperience
);
// delete expierience
router.delete("/api/profile/experience/:exp_id", auth, deleteExperience);
// add education
router.put(
  "/api/profile/education",
  auth,
  [
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
    check("from", "from is required").not().isEmpty(),
  ],
  addEducation
);
// delete education
router.delete("/api/profile/education/:edu_id", auth, deleteEducation);
export default router;
