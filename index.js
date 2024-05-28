import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./userRoute.js";
import urlShortenerRoute from "./urlShortenerRoute.js";
import connectToMongoDB from "./database.config.js";
import { fileURLToPath } from "url";
import path from "path";

// Determine which environment file to load
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envPath) });

const app = express();
const hostname = "0.0.0.0";
const PORT = process.env.PORT || 3000;

connectToMongoDB();

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin:", origin);
      if (origin === process.env.FRONTEND_URL || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoute);
app.use("/api", urlShortenerRoute);

app.listen(PORT, () =>
  console.log(`Server running at http://${hostname}:${PORT}`)
);
