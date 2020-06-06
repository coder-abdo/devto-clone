import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { url } from "gravatar";
import { genSalt, hash } from "bcryptjs";
import User from "../models/User";
const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //   check if fileds are valid and not empty
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    // check the user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "this email is already exist" });
    }
    // Get the avatar image
    const avatar = url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    // create hashed password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = await User.create({
      name,
      email,
      avatar,
      password: hashedPassword,
    });
    await user.save();
    res.send("users api");
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export { createUser };
