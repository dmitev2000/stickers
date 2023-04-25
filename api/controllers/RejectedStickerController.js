import RejectedSticker from "../models/RejectedStickerModel.js";

export const GetRejectedStickers = async (req, res, next) => {
  try {
    const rejectedStickers = await RejectedSticker.find({});
    res.status(200).json(rejectedStickers);
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
