import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import urlShortenerRoute from "./routes/urlShortenerRoute.js";
import connectToMongoDB from "./database.config.js";

dotenv.config();

const app = express();
const hostname = "0.0.0.0";
const PORT = process.env.PORT || 3000;

connectToMongoDB();

// Configure CORS to allow requests from your frontend domain
app.use(cors({ origin: "https://shimmering-kheer-8dc5c2.netlify.app/", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRoute);
app.use("/api", urlShortenerRoute);

app.listen(PORT, () => console.log(`Server running at http://${hostname}:${PORT}`));
