import { Request, Response } from "express";
import User from "../models/User";
interface Iuser extends Request {
  user: {
    id: string;
  };
}
const getAuth = async (req: Iuser, res: Response, next: any) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export { getAuth };
