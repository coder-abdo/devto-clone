import { RequestHandler, Request, Response } from "express";
import { validationResult } from "express-validator";
import Profile from "../models/Profile";
import User from "../models/User";
import { Ireq, IProfile, TExp, TEdu } from "../typesAndInterfaces/types";

const getProfile: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(401)
        .json({ error: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
};
// create profile
const createProfile: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ error: errors.array() });
    }
    const {
      company,
      website,
      location,
      githubusername,
      twitter,
      facebook,
      youtube,
      instagram,
      linkedin,
      skills,
      status,
      bio,
    } = req.body;
    type TprofileFields = {
      user: string;
      company?: string;
      website?: string;
      bio?: string;
      location?: string;
      skills?: string[];
      status?: string;
      githubusername?: string;
      social: {
        youtube?: string;
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        instagram?: string;
      };
    };
    const profileFields = {} as TprofileFields;
    profileFields.user = req.user.id;
    profileFields.social = {};
    if (company) {
      profileFields.company = company;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    if (status) {
      profileFields.status = status;
    }
    if (skills) {
      profileFields.skills = skills
        .split(",")
        .map((skill: string) => skill.trim());
    }
    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (twitter) {
      profileFields.social.twitter = twitter;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = await Profile.create(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    next(err);
  }
};
// get all profiles
const getAllProfiles: RequestHandler = async (req, res, next) => {
  try {
    const profiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};
// get profile by user id
const getProfileByUserId: RequestHandler = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const profile = await Profile.findOne({ user: user_id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res
        .status(401)
        .json({ error: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
// delete user & profile
const deleteProfile: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "user is deleted" });
  } catch (error) {
    next(error);
  }
};
// add experience
const addExperience: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array() });
  }
  const { title, company, location, current, from, to, description } = req.body;
  try {
    const newExp = { title, company, location, current, from, to, description };

    const profile = (await Profile.findOne({ user: req.user.id })) as IProfile;
    profile.experience.unshift(newExp);
    await profile?.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
const deleteExperience: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  try {
    const { exp_id } = req.params;
    const profile = (await Profile.findOne({
      user: req.user.user_id,
    })) as IProfile;
    let filteredExp = profile.experience.filter(
      (exp) => exp.id !== exp_id
    ) as TExp;
    profile.experience = filteredExp;
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
// add education
const addEducation: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array() });
  }
  const { school, degree, fieldofstudy, from, to, date, current } = req.body;
  try {
    const newEduc = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      date,
    };

    const profile = (await Profile.findOne({ user: req.user.id })) as IProfile;
    console.log(profile);
    profile.education.unshift(newEduc);
    await profile?.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
// delete education
const deleteEducation: RequestHandler = async (
  req: Ireq | any,
  res: Response,
  next: any
) => {
  try {
    const { edu_id } = req.params;
    const profile = (await Profile.findOne({
      user: req.user.user_id,
    })) as IProfile;
    let filteredEdu = profile.education.filter(
      (edu) => edu.id !== edu_id
    ) as TEdu;
    profile.education = filteredEdu;
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
export {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  deleteExperience,
  addExperience,
  addEducation,
  deleteEducation,
};
