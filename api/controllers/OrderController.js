import Order from "../models/OrderModel.js";
import Sticker from "../models/StickerModel.js";
import { CreateError } from "../utils/Error.js";

export const GetAllOrders = async (req, res, next) => {};

export const PlaceOrder = async (req, res, next) => {
  try {
    const {
      userID,
      stickerList,
      totalPrice,
      shippingDetails,
      estimatedDelivery,
    } = req.body;

    const newOrder = new Order({
      userID,
      stickerList,
      totalPrice,
      shippingDetails,
      estimatedDelivery,
    });

    await newOrder.save();

    res.status(201).json("Order placed successfully.");
  } catch (error) {
    next(error);
  }
};

export const GetOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ _id: req.params.id });

    if (!order) {
      return next(CreateError(400, "Invalid order ID."));
    }

    const o = order[0];
    const stickersDetails = [];

    for (var i = 0; i < o.stickerList.length; i++) {
      const currentSticker = await Sticker.find({
        _id: o.stickerList[i].stickerID,
      });
      stickersDetails.push({
        sticker: currentSticker,
        quantity: o.stickerList[i].quantity,
      });
    }

    const dataToReturn = {
      orderID: o._id,
      stickersDetalis: stickersDetails,
      totalPrice: o.totalPrice,
      shippingDetails: o.shippingDetails,
      estimatedDelivery: o.estimatedDelivery,
      status: o.status,
      rating: o.rating || null,
      date: o.createdAt,
      confirmationDate: o.confirmationDate || null,
    };
    res.status(200).json(dataToReturn);
  } catch (error) {
    next(error);
  }
};

export const GetOrdersByUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userID: req.params.user_id });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const GetPlacedOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "Placed" });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const ConfirmOrder = async (req, res, next) => {
  try {
    const o = await Order.findById(req.body.order_id);
    if (!o) {
      return next(CreateError(404, "Order not found."));
    }
    const newEstimatedDelivery = new Date().setDate(new Date().getDate() + 4);
    await Order.updateOne(
      {
        _id: req.body.order_id,
      },
      {
        $set: {
          status: "Confirmed",
          confirmationDate: new Date(),
          estimatedDelivery: newEstimatedDelivery,
        },
      }
    );
    res.status(201).json("Order confirmed.");
  } catch (error) {
    next(error);
  }
};
