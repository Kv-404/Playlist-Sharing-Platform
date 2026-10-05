import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";

export const app = express();

const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/comments", commentRoutes);

app.use(notFound);
app.use(errorHandler);
