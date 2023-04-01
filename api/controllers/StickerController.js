import Sticker from "../models/StickerModel.js";

export const GetStickers = async (req, res, next) => {
  try {
    const stickers = await Sticker.find({});
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json(error.message);
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
