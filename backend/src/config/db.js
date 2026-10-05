import mongoose from "mongoose";

let pending = null;
let watching = false;

function watchConnection() {
  if (watching) return;
  watching = true;
  mongoose.connection.on("disconnected", () => {
    pending = null;
  });
}

export async function connectDB(uri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (pending) return pending;
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  watchConnection();
  mongoose.set("strictQuery", true);
  const attempt = mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 }).catch((error) => {
    if (pending === attempt) pending = null;
    throw error;
  });
  pending = attempt;
  return attempt;
}
