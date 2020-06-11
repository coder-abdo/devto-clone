import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { url } from "gravatar";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import { Document } from "mongoose";
const signup: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //   check if fileds are valid and not empty
    const errors = validationResult(req);
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
    const payload = {
      user: {
        id: user.id,
      },
    };
    const secret = process.env.JWT_SECRET as string;
    const expiredDate = process.env.JWT_EXPIRED;
    sign(payload, secret, { expiresIn: expiredDate }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (err) {
    next(err);
  }
};
// Login
const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req);
    // check if the fields are empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    //  check the user is exisiting
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
      return res.status(401).json({ error: "This email is not exist" });
    }
    // check the password
    interface IUser extends Document {
      password: string;
      email: string;
    }
    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ error: "email / password is incorrect" });
    }
    // assign jwt and get it back
    const payload = {
      user: {
        id: user.id,
      },
    };
    const secret = process.env.JWT_SECRET as string;
    const expired = process.env.JWT_EXPIRED as any;
    sign(payload, secret, { expiresIn: expired }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    next(error);
  }
};
export { signup, login };
