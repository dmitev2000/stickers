import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StickerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Sticker title required."],
      unique: [true, "This sticker already exist."],
    },
    image: {
      type: String,
      required: [true, "Sticker image required."],
    },
    company: {
      type: String,
      required: [true, "Sticker company required."],
    },
    price: {
      type: Number,
      required: [true, "Price required."],
      min: [0.1, "Price too low."],
      max: [1.5, "Price too high"],
    },
    sticker_type: {
      type: String,
      required: [true, "Sticker type required."],
    },
    by: {
      type: String,
      defautl: "Community",
    },
  },
  { timestamps: true }
);

const Sticker = mongoose.model("Sticker", StickerSchema);

export default Sticker;
