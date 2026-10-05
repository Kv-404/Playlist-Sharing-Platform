import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      minlength: [1, "Comment text is required"],
      maxlength: [500, "Comment must be 500 characters or fewer"],
    },
    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Comment = mongoose.model("Comment", commentSchema);
