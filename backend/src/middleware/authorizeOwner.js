import mongoose from "mongoose";
import { Playlist } from "../models/Playlist.js";

export async function authorizeOwner(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid playlist id" });
  }

  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }
    if (!playlist.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You can only change your own playlists",
      });
    }
    req.playlist = playlist;
    next();
  } catch (err) {
    next(err);
  }
}
