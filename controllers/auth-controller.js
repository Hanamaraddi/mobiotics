import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, ProfilePicture } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json("User Already Registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("User Register Success");
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not Found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(400).json("Wrong Creditials");

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })

      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
