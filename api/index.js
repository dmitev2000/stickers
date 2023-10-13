import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import StickerRoutes from "./routes/StickerRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthenticationRoutes from "./routes/AuthenticationRoutes.js";
import UserCartRoutes from "./routes/UserCartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import RejectedStickersRoutes from "./routes/RejectedStickerRoutes.js";
import FavoriteStickersRoutes from "./routes/UserFavoritesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/stickers", StickerRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthenticationRoutes);
app.use("/api/cart", UserCartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/rejected", RejectedStickersRoutes);
app.use("/api/favorites", FavoriteStickersRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  let errorMessage;
  if (
    err.message
      .toString()
      .includes("is shorter than the minimum allowed length")
  ) {
    errorMessage = "Username must be at least 5 characters long.";
  } else errorMessage = err.message || "Something went wrong.";
  return res.status(errorStatus).json(errorMessage);
});

const db_url = process.env.DB_URL;
mongoose.connect(db_url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected.");
  app.listen(port, () => {
    console.log(`API started on port: ${port}.`);
  });
});
