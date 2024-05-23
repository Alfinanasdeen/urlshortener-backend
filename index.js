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

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRoute);
app.use("/api", urlShortenerRoute);

app.listen(PORT, () => console.log(`Server running at http://${hostname}:${PORT}`));
