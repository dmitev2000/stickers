import express from "express";
import {
  AddRejectedSticker,
  GetRejectedStickers,
  GetRejectedStickersForUser,
} from "../controllers/RejectedStickerController.js";
import { VerifyToken, VerifyUser } from "../middlewares/Restrict.js";

const router = express.Router();

router.get("/get", GetRejectedStickers);

router.get("/get/:user_id", VerifyToken, VerifyUser, GetRejectedStickersForUser);

router.post("/add", AddRejectedSticker);

export default router;
