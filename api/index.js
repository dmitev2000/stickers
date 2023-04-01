import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import StickerRouter from "./routes/StickerRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/stickers/", StickerRouter);

const db_url = process.env.DB_URL;
mongoose.connect(db_url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established.");
  app.listen(port, () => {
    console.log(`API started on port: ${port}.`);
  });
});
