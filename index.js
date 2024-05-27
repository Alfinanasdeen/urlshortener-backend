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

//app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// Allow requests from the origin of your frontend application
app.use(cors({ origin: "https://shimmering-kheer-8dc5c2.netlify.app" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoute);
app.use("/api", urlShortenerRoute);

app.listen(PORT, () =>
  console.log(`Server running at http://${hostname}:${PORT}`)
);
