import mongoose from "mongoose";

const songTitle = {
  type: String,
  trim: true,
  minlength: [1, "Song titles cannot be empty"],
  maxlength: [120, "Each song title must be 120 characters or fewer"],
};

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title must be 100 characters or fewer"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description must be 500 characters or fewer"],
      default: "",
    },
    songs: {
      type: [songTitle],
      required: [true, "Add at least one song title"],
      validate: {
        validator(songs) {
          return Array.isArray(songs) && songs.length >= 1 && songs.length <= 50;
        },
        message: "A playlist needs between 1 and 50 song titles",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
