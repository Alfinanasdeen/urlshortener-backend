import express from "express";
import ShortUrl from "../models/ShortUrl.js";

const router = express.Router();

// Fetch all short URLs
router.get("/shortUrls", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.json(shortUrls);
  } catch (error) {
    res.status(500).json({ status: "Error", error });
  }
});

// Create a short URL
router.post("/shortUrls", async (req, res) => {
  console.log("Request Body:", req.body);
  const { fullUrl } = req.body;

  if (!fullUrl) {
    return res.status(400).send({ error: "Full URL is required" });
  }

  try {
    const short = generateUrl();
    const newShortUrl = new ShortUrl({ full: fullUrl, short });

    const savedShortUrl = await newShortUrl.save();
    res.status(201).json(savedShortUrl);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
function generateUrl() {
  let rndResult = "";
  let charaters =
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
  let CharacterLength = charaters.length;

  for (let i = 0; i < 5; i++) {
    rndResult += charaters.charAt(Math.floor(Math.random() * CharacterLength));
  }
  return rndResult;
}

// Redirect to the full URL
router.get("/:shortUrl", async (req, res) => {
  console.log(`Redirect Request: ${req.params.shortUrl}`);
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    console.log(`Found Short URL: ${JSON.stringify(shortUrl)}`);

    if (!shortUrl) {
      console.log("Short URL not found");
      return res.sendStatus(404);
    }

    shortUrl.clicks++;
    await shortUrl.save();

    res.redirect(shortUrl.full);
  } catch (error) {
    console.error("Error during redirection:", error);
    res.status(500).json({ status: "Error", error });
  }
});

export default router;
