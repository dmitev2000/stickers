import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no user ID."],
    },
    stickerList: {
      type: Array,
      required: [true, "There are no items."]
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price must be calculated."],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
