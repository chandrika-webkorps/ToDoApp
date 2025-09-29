import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log("error connecting to db", err));
