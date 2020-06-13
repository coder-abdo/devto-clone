import { Schema, model } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const profileSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  website: String,
  location: String,
  company: String,
  bio: String,
  githubusername: String,
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: [
    {
      location: String,
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: Date,
      current: {
        type: Boolean,
        required: true,
      },
      description: String,
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      current: {
        type: Boolean,
        required: true,
      },
      to: Date,
      description: String,
    },
  ],
  socials: {
    youtube: String,
    facebook: String,
    linkedin: String,
    twitter: String,
    instagram: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Profile = model("Profile", profileSchema);
export default Profile;
