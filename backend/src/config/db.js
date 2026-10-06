import mongoose from "mongoose";

const APP_DATABASE = "playlist-platform";

let pending = null;
let watching = false;

function watchConnection() {
  if (watching) return;
  watching = true;
  mongoose.connection.on("disconnected", () => {
    pending = null;
  });
}

// A connection string with no database name makes MongoDB use "test".
// Keep real accounts in playlist-platform, and leave an explicit test database alone.
export function databaseName(uri) {
  const withoutQuery = uri.split("?")[0];
  const schemeIndex = withoutQuery.indexOf("://");
  const afterScheme = schemeIndex === -1 ? withoutQuery : withoutQuery.slice(schemeIndex + 3);
  const slashIndex = afterScheme.indexOf("/");
  const named = slashIndex === -1 ? "" : afterScheme.slice(slashIndex + 1).replace(/\/+$/, "");
  if (!named || named === "test") return APP_DATABASE;
  return named;
}

export async function connectDB(uri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (pending) return pending;
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  watchConnection();
  mongoose.set("strictQuery", true);
  const attempt = mongoose
    .connect(uri, { dbName: databaseName(uri), serverSelectionTimeoutMS: 10000 })
    .catch((error) => {
      if (pending === attempt) pending = null;
      throw error;
    });
  pending = attempt;
  return attempt;
}
