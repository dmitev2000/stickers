import express from "express";
import { AddRejectedSticker, GetRejectedStickers } from "../controllers/RejectedStickerController.js";

const router = express.Router();

router.get("/get", GetRejectedStickers);

router.post("/add", AddRejectedSticker);

export default router;