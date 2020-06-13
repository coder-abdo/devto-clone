import { Request } from "express";
import { Document } from "mongoose";
export interface Ireq extends Request {
  user: {
    id: string;
  };
}
export type TExp = [
  {
    id?: string;
    title: string;
    company: string;
    location: string;
    current: boolean;
    from: string;
    to?: string;
    description?: string;
  }
];
export type TEdu = [
  {
    id?: string;
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    current: boolean;
    to?: string;
    date?: string;
  }
];
export interface IProfile extends Document {
  experience: TExp;
  education: TEdu;
}
export interface IUser extends Document {
  name: string;
  avatar: string;
}
export type TLike = {
  user: string;
};
export interface IPost extends Document {
  user: string;
  likes: TLike[];
}
