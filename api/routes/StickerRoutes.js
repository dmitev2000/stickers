import express from "express";
import {
  GetStickers,
  AddSticker,
  GetStickerById,
} from "../controllers/StickerController.js";
import { VerifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.get("/", GetStickers);

router.get("/:id", GetStickerById);

router.post("/add", VerifyToken, AddSticker);

export default router;
