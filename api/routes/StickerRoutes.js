import express from "express";
import { GetStickers, AddSticker } from "../controllers/StickerController.js";

const router = express.Router();

router.get("/", GetStickers);

router.post("/add", AddSticker);

export default router;
