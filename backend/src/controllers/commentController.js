import mongoose from "mongoose";
import { Comment } from "../models/Comment.js";
import { Playlist } from "../models/Playlist.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { presentComment } from "../utils/present.js";

export const createComment = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid playlist id" });
  }

  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) {
    return res.status(404).json({ success: false, message: "Playlist not found" });
  }

  const comment = await Comment.create({
    text: req.body.text,
    playlist: playlist._id,
    user: req.user._id,
  });
  await comment.populate("user", "name");

  res.status(201).json({ success: true, data: presentComment(comment) });
});

export const deleteComment = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid comment id" });
  }

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ success: false, message: "Comment not found" });
  }
  if (!comment.user.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You can only delete your own comments",
    });
  }

  await comment.deleteOne();
  res.json({ success: true, data: { deleted: true } });
});
