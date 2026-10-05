import { body } from "express-validator";

export const registerRules = [
  body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2–60 characters"),
  body("email").trim().toLowerCase().isEmail().withMessage("Enter a valid email"),
  body("password")
    .isString()
    .isLength({ min: 6, max: 72 })
    .withMessage("Password must be 6–72 characters"),
];

export const loginRules = [
  body("email").trim().toLowerCase().isEmail().withMessage("Enter a valid email"),
  body("password").isString().notEmpty().withMessage("Password is required"),
];

export const createPlaylistRules = [
  body("title").trim().isLength({ min: 2, max: 100 }).withMessage("Title must be 2–100 characters"),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be 500 characters or fewer"),
  body("songs").isArray({ min: 1, max: 50 }).withMessage("Add between 1 and 50 song titles"),
  body("songs.*")
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage("Each song title must be 1–120 characters"),
];

export const updatePlaylistRules = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be 2–100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be 500 characters or fewer"),
  body("songs")
    .optional()
    .isArray({ min: 1, max: 50 })
    .withMessage("Add between 1 and 50 song titles"),
  body("songs.*")
    .optional()
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage("Each song title must be 1–120 characters"),
];

export const createCommentRules = [
  body("text").trim().isLength({ min: 1, max: 500 }).withMessage("Comment must be 1–500 characters"),
];
