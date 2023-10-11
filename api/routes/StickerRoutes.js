import express from "express";
import {
  GetStickers,
  AddSticker,
  GetStickerById,
  GetPendingStickers,
  UpdateStickerStatus,
  GetFavoriteStickers,
  GetStickersFromOrder,
} from "../controllers/StickerController.js";
import multer from "multer";
import { VerifyToken } from "../middlewares/Restrict.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", GetStickers);

router.get("/:id", GetStickerById);

router.get("/get/pending", GetPendingStickers);

router.get("/get/favorite", GetFavoriteStickers);

router.post("/add", VerifyToken, upload.single("image"), AddSticker);

router.post("/stickers-from-order", GetStickersFromOrder);

router.post("/update-status", UpdateStickerStatus);

export default router;
