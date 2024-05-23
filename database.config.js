import mongoose from "mongoose";

function connectToMongoDB() {
  const DATABASE_URI =
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI
      : `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@urlshortener.ttfp7rw.mongodb.net/`;
  mongoose
    .connect(DATABASE_URI)
    .then((response) => {
      console.log("Database connection successful");
    })
    .catch((error) => console.log(error));
}

export default connectToMongoDB;
