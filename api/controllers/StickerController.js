import Sticker from "../models/StickerModel.js";
import { CreateError } from "../utils/Error.js";

export const GetStickers = async (req, res, next) => {
  try {
    const stickers = await Sticker.find({}).sort({ createdAt: -1 });
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const GetStickerById = async (req, res, next) => {
  try {
    const sticker = await Sticker.findById(req.params.id);
    if (!sticker) {
      return next(CreateError(404, "Sticker not found."));
    }
    res.status(200).json(sticker);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return next(CreateError(400, "Bad request (invalid ID)."));
    }
    next(error);
  }
};

export const AddSticker = async (req, res, next) => {
  try {
    const newSticker = new Sticker({
      title: req.body.title,
      image: req.body.image,
      price: req.body.price,
      company: req.body.company,
      sticker_type: req.body.sticker_type,
      by: req.body.by ? req.body.by : "Community",
    });

    await newSticker.save();

    res.status(201).json("Sticker successfully added.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
