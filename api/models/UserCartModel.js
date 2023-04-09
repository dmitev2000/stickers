import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserCartSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    stickerList: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const UserCart = mongoose.model("UserCart", UserCartSchema);

export default UserCart;
