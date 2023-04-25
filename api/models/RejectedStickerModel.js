import mongoose from "mongoose";
import Sticker from "./StickerModel.js";

const Schema = mongoose.Schema;

const RejectedStickerSchema = new Schema({
  sticker: { type: Object, required: true },
  reason: {
    type: String,
    required: true,
    minLength: [20, "Reason explanation too short."],
  },
});

const RejectedSticker = mongoose.model(
  "RejectedSticker",
  RejectedStickerSchema
);

export default RejectedSticker;
