import { Request } from "express";
import { Document } from "mongoose";
export interface Ireq extends Request {
  user: {
    id: string;
  };
}
export interface IProfile extends Document {
  experience: [
    {
      title: string;
      company: string;
      location: string;
      current: boolean;
      from: string;
      to?: string;
      description?: string;
    }
  ];
}
