import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./userRoute.js";
import urlShortenerRoute from "./urlShortenerRoute.js";
import connectToMongoDB from "./database.config.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Determine which environment file to load
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envPath) });

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoute);
app.use("/api", urlShortenerRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
