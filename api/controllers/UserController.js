import User from "../models/UserModel.js";
import { CreateError } from "../utils/Error.js";
import Order from "../models/OrderModel.js";

export const GetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { username, _id } = user;
    res.status(200).json({ username, _id });
  } catch (err) {
    next(CreateError(404, "User does not exist."));
  }
};

export const GetCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: "User" });

    const result = [];

    await Promise.all(
      customers.map(async (customer, index) => {
        const { password, ...otherProps } = customer._doc;
        const totalOrders = (await Order.find({ userID: customer._id })).length;
        const customerWithOrders = {
          ...otherProps,
          totalOrders: totalOrders,
        };
        result.push(customerWithOrders);
      })
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const DeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(204).json("User deleted successfully.");
  } catch (error) {
    next(error);
  }
};
