import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET. Copy .env.example to .env and set it.");
  process.exit(1);
}

try {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
} catch (err) {
  console.error("Database connection failed:", err.message);
  process.exit(1);
}
