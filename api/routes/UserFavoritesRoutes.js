import express from "express";
import {
  AddStickerToFavorites,
  ClearFavorites,
  GetUserFavorites,
  RemoveStickerFromFavorites,
} from "../controllers/UserFavoritesController.js";
import { VerifyToken, VerifyUser } from "../middlewares/Restrict.js";

const router = express.Router();

router.get("/:user_id", VerifyToken, VerifyUser, GetUserFavorites);

router.put("/add/:user_id", VerifyToken, VerifyUser, AddStickerToFavorites);

router.put("/remove/:user_id", VerifyToken, VerifyUser, RemoveStickerFromFavorites);

router.put("/clear-favs/:user_id", VerifyToken, VerifyUser, ClearFavorites);

export default router;
