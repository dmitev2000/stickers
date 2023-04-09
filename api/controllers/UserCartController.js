import UserCart from "../models/UserCartModel.js";
import { CreateError } from "../utils/Error.js";

export const GetCartItems = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const cart = await UserCart.findOne({ userID: userID });
    if (!cart) {
      return next(CreateError(404, "Invalid user ID"));
    }
    res.status(200).json(cart.stickerList);
  } catch (error) {
    return next(error);
  }
};

export const UpdateCart = async (req, res, next) => {
  try {
    const cart = await UserCart.findOne({ userID: req.body.userID });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    const list = cart.stickerList;

    const index = list.findIndex((item) => {
      return item.sticker._id === req.body.sticker._id;
    });

    if (index !== -1) {
      list[index] = {
        sticker: list[index].sticker,
        quantity: list[index].quantity + req.body.quantity,
      };
    } else {
      list.push({ sticker: req.body.sticker, quantity: req.body.quantity });
    }

    await UserCart.updateOne(
      { userID: req.body.userID },
      { $set: { stickerList: list } }
    );

    res.status(200).json(list);
  } catch (error) {
    return next(error);
  }
};

export const RemoveItemFromCart = async (req, res, next) => {
  try {
    const cart = await UserCart.findOne({ userID: req.body.userID });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    const cart_items_filtered = cart.stickerList.filter((item) => {
      return item.sticker._id !== req.body.stickerID;
    });

    await UserCart.updateOne(
      { userID: req.body.userID },
      { $set: { stickerList: cart_items_filtered } }
    );

    res.status(200).json(cart_items_filtered);
  } catch (error) {
    return next(error);
  }
};

export const EmptyCart = async (req, res, next) => {
  try {
    const cart = await UserCart.findOne({ userID: req.body.userID });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    await UserCart.updateOne(
      { userID: req.body.userID },
      { $set: { stickerList: [] } }
    );

    res.status(200).json("Your cart is now empty.");
  } catch (error) {
    return next(error);
  }
};
