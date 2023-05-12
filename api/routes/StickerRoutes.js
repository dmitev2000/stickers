import express from "express";
import {
  GetStickers,
  AddSticker,
  GetStickerById,
  CalculatePriceForSticker,
  GetPendingStickers,
  UpdateStickerStatus,
  GetFavoriteStickers,
  GetStickersFromOrder,
} from "../controllers/StickerController.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.get("/", GetStickers);

router.get("/:id", GetStickerById);

router.get("/get/pending", GetPendingStickers);

router.get("/get/favorite", GetFavoriteStickers);

router.post("/add", AddSticker);

router.post("/stickers-from-order", GetStickersFromOrder);

router.post("/update-status", UpdateStickerStatus)

router.post("/calculate-price", CalculatePriceForSticker);


export default router;
