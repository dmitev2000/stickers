import UserFavorites from "../models/UserFavoritesModel.js";
import Sticker from "../models/StickerModel.js";
import { CreateError } from "../utils/Error.js";

export const GetUserFavorites = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const favs = await UserFavorites.findOne({ userID: user_id });
    if (!favs) {
      return next(CreateError(404, "Bad request."));
    }
    const { stickerIDs } = favs;
    const stickersData = await Sticker.find({ _id: { $in: stickerIDs } });
    res.status(200).json(stickersData);
  } catch (error) {
    next(error);
  }
};

export const AddStickerToFavorites = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { sticker_id } = req.body;
    const favs = await UserFavorites.findOne({ userID: user_id });
    const list = favs.stickerIDs;
    if (list.includes(sticker_id)) {
      return next(
        CreateError(
          404,
          "This sticker is already added in your favorites list."
        )
      );
    }
    list.push(sticker_id);
    await UserFavorites.updateOne(
      { userID: user_id },
      { $set: { stickerIDs: list } }
    );
    res.status(200).json("Sticker added to favorites.");
  } catch (error) {
    next(error);
  }
};

export const RemoveStickerFromFavorites = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { sticker_id } = req.body;
    const favs = await UserFavorites.findOne({ userID: user_id });
    const list = favs.stickerIDs;
    if (!list.includes(sticker_id)) {
      return next(
        CreateError(404, "This sticker is not in your favorites list.")
      );
    }
    await UserFavorites.updateOne(
      { userID: user_id },
      { $set: { stickerIDs: list.filter((s) => s !== sticker_id) } }
    );
    res.status(200).json("Sticker removed from favorites.");
  } catch (error) {
    next(error);
  }
};

export const ClearFavorites = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    await UserFavorites.updateOne(
      { userID: user_id },
      { $set: { stickerIDs: [] } }
    );
    res.status(200).json("You favorites list is now empty.");
  } catch (error) {
    next(error);
  }
};
