import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userID: {
      type: String,
      required: [true, "There is no user ID."],
    },
    stickerList: {
      type: Array,
      required: [true, "There are no items."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price must be calculated."],
    },
    status: {
      type: String,
      default: "Placed",
    },
    estimatedDelivery: {
      type: Date,
      required: [true, "Please provide a estimated delivery date."],
    },
    confirmationDate: {
      type: Date,
    },
    rating: {
      type: Number,
    },
    shippingDetails: {
      type: Object,
      required: [true, "You must provide shipping details."],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
