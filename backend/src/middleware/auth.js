import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

function readToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7).trim() || null;
}

async function userFromToken(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(payload.id);
}

export async function requireAuth(req, res, next) {
  const token = readToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const user = await userFromToken(token);
    if (!user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export async function optionalAuth(req, res, next) {
  const token = readToken(req);
  if (!token) {
    return next();
  }

  try {
    req.user = await userFromToken(token);
  } catch {
    req.user = null;
  }
  next();
}
