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
      unique: [true, "This sticker already exist."],
    },
    company: {
      type: String,
      required: [true, "Sticker company required."],
    },
    price: {
      type: Number,
      required: [true, "Price required."],
      min: [0.01, "Price too low."],
      max: [1.50, "Price too high"],
    },
    tags: {
      type: Array,
      required: [true, "Sticker tags required."],
      min: [1, 'Must be at least 1 tag, got {VALUE}']
    },
    by: {
      type: String,
      default: "Community",
    },
    reviewed: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

const Sticker = mongoose.model("Sticker", StickerSchema);

export default Sticker;
