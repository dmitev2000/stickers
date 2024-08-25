import RejectedSticker from "../models/RejectedStickerModel.js";
import jwt from "jsonwebtoken";
import Sticker from "../models/StickerModel.js";

export const GetRejectedStickers = async (req, res, next) => {
  try {
    const rejectedStickers = await RejectedSticker.find({});
    res.status(200).json(rejectedStickers);
  } catch (error) {
    next(error);
  }
};

export const GetRejectedStickersForUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT);
    const { username } = payload;

    const rejectedStickers = await RejectedSticker.find({
      "sticker.by": username,
    });

    const validStickers = await Sticker.find({
      by: username,
    });

    res.status(200).json({ rejectedStickers, validStickers });
  } catch (error) {
    next(error);
  }
};

export const AddRejectedSticker = async (req, res, next) => {
  try {
    const newEntry = new RejectedSticker({
      sticker: req.body.sticker,
      reason: req.body.reason,
    });
    await newEntry.save();
    res.status(201).json("The rejected sticker has been saved.");
  } catch (error) {
    next(error);
  }
};
