import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function signToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export const register = asyncHandler(async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email is already registered" });
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).json({
    success: true,
    data: { user, token: signToken(user) },
  });
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  res.json({
    success: true,
    data: { user, token: signToken(user) },
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});
