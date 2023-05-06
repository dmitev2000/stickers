import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserFavoritesSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID required."],
      unique: [true, "This user already has favorites list."],
    },
    stickerIDs: {
      type: Array,
      required: [true, "Sticker list required."],
      default: [],
    }
  },
  { timestamps: true }
);

const UserFavorites = mongoose.model("UserFavorites", UserFavoritesSchema);

export default UserFavorites;
