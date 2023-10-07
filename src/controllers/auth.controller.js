import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    const passHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved.id, username });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }

    const pwMatched = await bcrypt.compare(password, userFound.password);
    if (!pwMatched) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }
    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(404).json({ message: "User not found " });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized access" });

    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(401).json({ message: "Unauthorized access" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
