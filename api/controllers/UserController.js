import User from "../models/UserModel.js";
import { CreateError } from "../utils/Error.js";

export const GetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { username, _id } = user;
    res.status(200).json({ username, _id });
  } catch (err) {
    next(CreateError(404, "User does not exist."));
  }
};
