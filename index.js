import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./userRoute.js";
import urlShortenerRoute from "./urlShortenerRoute.js";
import connectToMongoDB from "./database.config.js";

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
