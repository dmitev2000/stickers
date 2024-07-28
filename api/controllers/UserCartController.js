import UserCart from "../models/UserCartModel.js";
import Sticker from "../models/StickerModel.js";
import { CreateError } from "../utils/Error.js";

export const GetCartItems = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const cart = await UserCart.findOne({ userID: user_id });
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
    const { user_id } = req.params;
    const { sticker, quantity } = req.body;

    const cart = await UserCart.findOne({ userID: user_id });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    const list = cart.stickerList;

    const index = list.findIndex((item) => {
      return item.sticker._id === sticker._id;
    });

    if (index !== -1) {
      list[index] = {
        sticker: list[index].sticker,
        quantity: list[index].quantity + quantity,
      };
    } else {
      list.push({ sticker: sticker, quantity: quantity });
    }

    await UserCart.updateOne(
      { userID: user_id },
      { $set: { stickerList: list } }
    );

    res.status(200).json(list);
  } catch (error) {
    return next(error);
  }
};

export const AddMultipleStickersToCart = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    // * stickersToAdd is array of sticker IDs
    const { stickersToAdd } = req.body;

    if (!user_id || !stickersToAdd || stickersToAdd.length === 0) {
      return next(CreateError(400, "Bad request."));
    }

    // ! If cart is null then send Bad Request
    const cart = await UserCart.findOne({ userID: user_id });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    // TODO: Get the stickers data
    const stickers_data = await Sticker.find({ _id: { $in: stickersToAdd } });

    const list = cart.stickerList;

    for (let i = 0; i < stickers_data.length; i++) {
      const index = list.findIndex((item) => {
        return item.sticker._id === stickers_data[i]._id;
      });

      if (index !== -1) {
        list[index] = {
          sticker: list[index].sticker,
          quantity: list[index].quantity + 1,
        };
      } else {
        list.push({ sticker: stickers_data[i], quantity: 1 });
      }

      await UserCart.updateOne(
        { userID: user_id },
        { $set: { stickerList: list } }
      );
    }
    res.status(200).json({
      stickers: stickers_data,
      message: "Your cart is updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const RemoveItemFromCart = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { stickerID } = req.body;

    const cart = await UserCart.findOne({ userID: user_id });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    const cart_items_filtered = cart.stickerList.filter((item) => {
      return item.sticker._id !== stickerID;
    });

    await UserCart.updateOne(
      { userID: user_id },
      { $set: { stickerList: cart_items_filtered } }
    );

    res.status(200).json(cart_items_filtered);
  } catch (error) {
    return next(error);
  }
};

export const IncrementQuantity = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { stickerID } = req.body;

    const cart = await UserCart.findOne({ userID: user_id });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    const list = cart.stickerList.map((item) => {
      if (item.sticker._id === stickerID) {
        return { sticker: item.sticker, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });

    await UserCart.updateOne(
      { userID: user_id },
      { $set: { stickerList: list } }
    );

    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const DecrementQuantity = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { stickerID } = req.body;

    const cart = await UserCart.findOne({ userID: user_id });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    const list = cart.stickerList.map((item) => {
      if (item.sticker._id === stickerID) {
        if (item.quantity === 1) {
          return item;
        } else {
          return { sticker: item.sticker, quantity: item.quantity - 1 };
        }
      } else {
        return item;
      }
    });

    await UserCart.updateOne(
      { userID: req.body.user_id },
      { $set: { stickerList: list } }
    );

    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const EmptyCart = async (req, res, next) => {
  try {
    const cart = await UserCart.findOne({ userID: req.params.user_id });

    if (!cart) {
      return next(CreateError(400, "Bad request."));
    }

    await UserCart.updateOne(
      { userID: req.params.user_id },
      { $set: { stickerList: [] } }
    );

    res.status(200).json("Your cart is now empty.");
  } catch (error) {
    return next(error);
  }
};
