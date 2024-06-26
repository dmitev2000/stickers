import express from "express";
import {
  GetStickers,
  AddSticker,
  GetStickerById,
  GetPendingStickers,
  UpdateStickerStatus,
  GetStickersFromOrder,
  GetPopularStickers,
} from "../controllers/StickerController.js";
import multer from "multer";
import { VerifyAdmin, VerifyToken, VerifyUser } from "../middlewares/Restrict.js";

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

router.get("/get/popular", GetPopularStickers);

router.get("/get/pending", VerifyToken, VerifyAdmin, GetPendingStickers);

router.post("/add", VerifyToken, upload.single("image"), AddSticker);

router.post("/stickers-from-order", VerifyToken, GetStickersFromOrder);

router.post("/update-status/:user_id", VerifyToken, VerifyAdmin, UpdateStickerStatus);

export default router;
