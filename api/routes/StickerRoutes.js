import express from "express";
import {
  GetStickers,
  AddSticker,
  GetStickerById,
  CalculatePriceForSticker,
  GetPendingStickers,
  UpdateStickerStatus,
} from "../controllers/StickerController.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.get("/", GetStickers);

router.get("/:id", GetStickerById);

router.get("/get/pending", GetPendingStickers);

router.post("/add", AddSticker);

router.post("/update-status", UpdateStickerStatus)

router.post("/calculate-price", CalculatePriceForSticker);


export default router;
