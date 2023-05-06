import UserCart from "../models/UserCartModel.js";
import User from "../models/UserModel.js";
import UserFavorites from "../models/UserFavoritesModel.js";
import { CreateError } from "../utils/Error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return next(CreateError(400, "Password required."));
    } else if (req.body.password.length < 8) {
      return next(
        CreateError(400, "Password must be at least 8 characters long.")
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hash,
      role: req.body.role || "User",
    });
    await newUser.save();

    const user = await User.findOne({ username: req.body.username });

    const newUserCart = new UserCart({
      userID: user._id,
      stickerList: [],
    });
    await newUserCart.save();

    const newUserFavorites = new UserFavorites({
      userID: user._id,
      stickerIDs: [],
    });
    await newUserFavorites.save();

    res.status(201).json("User has been created.");
  } catch (err) {
    if (err.toString().includes("duplicate key error")) {
      next(CreateError(400, "User already exist."));
    } else next(err);
  }
};

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(CreateError(404, "User not found."));
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return next(CreateError(400, "Wrong password."));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "24h",
    });

    const { password, ...otherProps } = user._doc;
    res.status(200).json({ user: { ...otherProps }, auth: { token } });
  } catch (err) {
    next(err);
  }
};
