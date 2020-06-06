import { Router } from "express";
import { check } from "express-validator";
import { createUser } from "../controllers/userController";

const router = Router();

router.post(
  "/api/users",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "password must be 6 characters or more").isLength({
      min: 6,
    }),
  ],
  createUser
);

export default router;
