import mongoose from "mongoose";
import { Comment } from "../models/Comment.js";
import { Playlist } from "../models/Playlist.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { presentComment, presentPlaylist } from "../utils/present.js";

function viewerId(req) {
  return req.user?.id;
}

function invalidId(res) {
  return res.status(400).json({ success: false, message: "Invalid playlist id" });
}

export const createPlaylist = asyncHandler(async (req, res) => {
  const playlist = await Playlist.create({
    title: req.body.title,
    description: req.body.description || "",
    songs: req.body.songs,
    owner: req.user._id,
  });
  await playlist.populate("owner", "name");

  res.status(201).json({
    success: true,
    data: presentPlaylist(playlist, viewerId(req)),
  });
});

export const listPlaylists = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate("owner", "name");

  res.json({
    success: true,
    data: playlists.map((playlist) => presentPlaylist(playlist, viewerId(req))),
  });
});

export const getPlaylist = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return invalidId(res);
  }

  const playlist = await Playlist.findById(req.params.id).populate("owner", "name");
  if (!playlist) {
    return res.status(404).json({ success: false, message: "Playlist not found" });
  }

  const comments = await Comment.find({ playlist: playlist._id })
    .sort({ createdAt: 1 })
    .populate("user", "name");

  res.json({
    success: true,
    data: {
      ...presentPlaylist(playlist, viewerId(req)),
      comments: comments.map(presentComment),
    },
  });
});

export const updatePlaylist = asyncHandler(async (req, res) => {
  const { title, description, songs } = req.body;
  if (title === undefined && description === undefined && songs === undefined) {
    return res.status(400).json({ success: false, message: "Nothing to update" });
  }

  if (title !== undefined) req.playlist.title = title;
  if (description !== undefined) req.playlist.description = description;
  if (songs !== undefined) req.playlist.songs = songs;

  await req.playlist.save();
  await req.playlist.populate("owner", "name");

  res.json({
    success: true,
    data: presentPlaylist(req.playlist, viewerId(req)),
  });
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  await Comment.deleteMany({ playlist: req.playlist._id });
  await req.playlist.deleteOne();
  res.json({ success: true, data: { deleted: true } });
});

export const toggleLike = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return invalidId(res);
  }

  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) {
    return res.status(404).json({ success: false, message: "Playlist not found" });
  }

  const alreadyLiked = playlist.likes.some((id) => id.equals(req.user._id));
  const updated = await Playlist.findByIdAndUpdate(
    playlist._id,
    alreadyLiked
      ? { $pull: { likes: req.user._id } }
      : { $addToSet: { likes: req.user._id } },
    { new: true }
  );

  res.json({
    success: true,
    data: {
      liked: !alreadyLiked,
      likeCount: updated.likes.length,
    },
  });
});
