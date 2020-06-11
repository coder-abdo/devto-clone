import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { RequestHandler } from "express";
config();
const auth: RequestHandler = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "No Token, Access Denied" });
  }
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
