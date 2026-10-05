import { Router } from "express";
import { createComment } from "../controllers/commentController.js";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  listPlaylists,
  toggleLike,
  updatePlaylist,
} from "../controllers/playlistController.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import { authorizeOwner } from "../middleware/authorizeOwner.js";
import { validate } from "../middleware/validate.js";
import {
  createCommentRules,
  createPlaylistRules,
  updatePlaylistRules,
} from "../validators.js";

const router = Router();

router.get("/", optionalAuth, listPlaylists);
router.post("/", requireAuth, createPlaylistRules, validate, createPlaylist);
router.get("/:id", optionalAuth, getPlaylist);
router.patch("/:id", requireAuth, authorizeOwner, updatePlaylistRules, validate, updatePlaylist);
router.delete("/:id", requireAuth, authorizeOwner, deletePlaylist);
router.post("/:id/like", requireAuth, toggleLike);
router.post("/:id/comments", requireAuth, createCommentRules, validate, createComment);

export default router;
