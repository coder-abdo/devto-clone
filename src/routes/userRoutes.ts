import { Router } from "express";
import { check } from "express-validator";
import { signup, login } from "../controllers/userController";

const router = Router();

router.post(
  "/api/users/signup",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "password must be 6 characters or more").isLength({
      min: 6,
    }),
  ],
  signup
);
router.post(
  "/api/users/login",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  login
);
export default router;
