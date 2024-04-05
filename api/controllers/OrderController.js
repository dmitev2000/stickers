import { CreateError } from "../utils/Error.js";
import Sticker from "../models/StickerModel.js";
import Order from "../models/OrderModel.js";
import { Parser } from "json2csv";

export const GetAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    next(CreateError(500, "Internal server error."));
  }
};

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
    const order = await Order.find({ _id: req.params.order_id });

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
        sticker: currentSticker[0],
        quantity: o.stickerList[i].quantity,
      });
    }

    const dataToReturn = {
      orderID: o._id,
      stickersDetails: stickersDetails,
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

export const CancelOrder = async (req, res, next) => {
  try {
    const orderToCancel = await Order.findById(req.params.order_id);
    if (!orderToCancel) {
      return next(CreateError(404, "This order does not exist."));
    }
    if (orderToCancel.status !== "Placed") {
      return next(CreateError(404, "You can't cancel this order."));
    }
    await Order.deleteOne({ _id: req.params.order_id });

    res.status(200).json("Your order has been canceled.");
  } catch (error) {
    next(error);
  }
};

export const GetOrdersByUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userID: req.params.user_id }).sort({
      totalPrice: "desc",
    });
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

export const GetConfirmedOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "Confirmed" });
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

export const GetOrderStatistics = async (req, res, next) => {
  try {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const date2 = new Date(date);
    date2.setDate(date2.getDate() - 1);
    date2.setHours(0);
    date2.setMinutes(0);
    date2.setSeconds(0);
    date2.setMilliseconds(0);
    const date3 = new Date(date);
    date3.setDate(date3.getDate() - 2);
    date3.setHours(0);
    date3.setMinutes(0);
    date3.setSeconds(0);
    date3.setMilliseconds(0);

    const today = await Order.find({
      createdAt: {
        $gte: new Date(date.toString().substring(4, 15)),
      },
      status: "Confirmed",
    });

    const yesterday = await Order.find({
      createdAt: {
        $gte: new Date(date2.toString().substring(4, 15)),
        $lt: new Date(date.toString().substring(4, 15)),
      },
      status: "Confirmed",
    });

    const the_day_before = await Order.find({
      createdAt: {
        $gte: new Date(date3.toString().substring(4, 15)),
        $lt: new Date(date2.toString().substring(4, 15)),
      },
      status: "Confirmed",
    });

    const todays_profit = today.reduce((acc, curr) => {
      return curr.totalPrice + acc;
    }, 0);

    const todays_sales = today.reduce((acc, curr) => {
      return (
        acc +
        curr.stickerList.reduce((acc2, curr2) => {
          return acc2 + curr2.quantity;
        }, 0)
      );
    }, 0);

    const yesterdays_profit = yesterday.reduce((acc, curr) => {
      return curr.totalPrice + acc;
    }, 0);

    const yesterdays_sales = yesterday.reduce((acc, curr) => {
      return (
        acc +
        curr.stickerList.reduce((acc2, curr2) => {
          return acc2 + curr2.quantity;
        }, 0)
      );
    }, 0);

    const the_day_before_profit = the_day_before.reduce((acc, curr) => {
      return curr.totalPrice + acc;
    }, 0);

    const the_day_before_sales = the_day_before.reduce((acc, curr) => {
      return (
        acc +
        curr.stickerList.reduce((acc2, curr2) => {
          return acc2 + curr2.quantity;
        }, 0)
      );
    }, 0);

    res.status(200).json([
      {
        name: date.toString().substring(4, 15),
        profit: todays_profit.toFixed(2),
        stickers_sold: todays_sales,
        num_orders: today.length,
      },
      {
        name: date2.toString().substring(4, 15),
        profit: yesterdays_profit.toFixed(2),
        stickers_sold: yesterdays_sales,
        num_orders: yesterday.length,
      },
      {
        name: date3.toString().substring(4, 15),
        profit: the_day_before_profit.toFixed(2),
        stickers_sold: the_day_before_sales,
        num_orders: the_day_before.length,
      },
    ]);
  } catch (error) {
    next(error);
  }
};

export const StatisticsByCategory = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    const stickers = await Sticker.find({});
    let language = 0;
    let framework = 0;
    let meme = 0;
    let other = 0;
    let service = 0;
    let tooling = 0;
    let protocol = 0;
    let os = 0;

    orders.forEach((order) => {
      order.stickerList.forEach((sticker) => {
        const current = stickers.filter((s) => {
          return s._id.toString() === sticker.stickerID;
        });
        if (current) {
          if (current[0].tags.includes("Language")) {
            language++;
          }
          if (current[0].tags.includes("Framework")) {
            framework++;
          }
          if (current[0].tags.includes("Meme")) {
            meme++;
          }
          if (current[0].tags.includes("Other")) {
            other++;
          }
          if (current[0].tags.includes("Service")) {
            service++;
          }
          if (current[0].tags.includes("Tooling")) {
            tooling++;
          }
          if (current[0].tags.includes("Protocol")) {
            protocol++;
          }
          if (current[0].tags.includes("OS")) {
            os++;
          }
        }
      });
    });

    res.status(200).json([
      {
        name: "Language",
        value: language,
      },
      {
        name: "Framework",
        value: framework,
      },
      {
        name: "Meme",
        value: meme,
      },
      {
        name: "Other",
        value: other,
      },
      {
        name: "Service",
        value: service,
      },
      {
        name: "Tooling",
        value: tooling,
      },
      {
        name: "Protocol",
        value: protocol,
      },
      {
        name: "OS",
        value: os,
      },
    ]);
  } catch (error) {
    next(error);
  }
};

export const GetAllTimeStatistics = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "Confirmed" });
    const totalProfit = orders.reduce((accumulator, value) => {
      return accumulator + value.totalPrice;
    }, 0);
    const totalStickers = orders.reduce((accumulator, value) => {
      return (
        accumulator +
        value.stickerList.reduce((acc2, val2) => {
          return acc2 + val2.quantity;
        }, 0)
      );
    }, 0);
    res.status(200).json({
      totalOrders: orders.length,
      totalProfit: +totalProfit.toFixed(2),
      totalStickers: totalStickers,
    });
  } catch (error) {
    next(error);
  }
};

export const SetRating = async (req, res, next) => {
  try {
    const rating = req.body.rating;
    const orderID = req.body.orderID;

    await Order.updateOne({ _id: orderID }, { $set: { rating: +rating } });

    res.status(200).json("Order rating updated.");
  } catch (error) {
    next(error);
  }
};

export const CurrentMonthStatistics = async (req, res, next) => {
  try {
    const currentMonth = new Date().getMonth() + 1;

    const orders = await Order.find({
      status: "Confirmed",
      createdAt: {
        $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1),
        $lt: new Date(new Date().getFullYear(), currentMonth, 1),
      },
    });
    const totalProfit = orders.reduce((accumulator, value) => {
      return accumulator + value.totalPrice;
    }, 0);
    const totalStickers = orders.reduce((accumulator, value) => {
      return (
        accumulator +
        value.stickerList.reduce((acc2, val2) => {
          return acc2 + val2.quantity;
        }, 0)
      );
    }, 0);
    res.status(200).json({
      totalOrders: orders.length,
      totalProfit: +totalProfit.toFixed(2),
      totalStickers: totalStickers,
    });
  } catch (error) {
    next(error);
  }
};

export const RatingStats = async (req, res, next) => {
  try {
    const totalOrders = (await Order.find({ status: "Confirmed" })).length;

    const rated_orders = await Order.find({
      rating: { $ne: null, $exists: true },
    });

    const rating_sum = rated_orders.reduce((accumulator, current_value) => {
      return (accumulator += current_value.rating);
    }, 0);

    res.status(200).json({
      totalOrders: totalOrders,
      ratedOrders: rated_orders.length,
      avgRating: +(rating_sum / rated_orders.length).toFixed(2),
    });
  } catch (error) {
    next(error);
  }
};

export const ExportOrdersToCSV = async (req, res, next) => {
  try {
    const orders = await Order.find(
      { status: "Confirmed" },
      "_id userID createdAt totalPrice"
    );

    const filteredOrders = orders.map((order) => ({
      Order_ID: order._id,
      User_ID: order.userID,
      Date: order.createdAt.toISOString(),
      Price: order.totalPrice,
    }));

    const file_header = ["Order_ID", "User_ID", "Date", "Price"];
    const json_data = new Parser({ file_header });
    const csv_data = json_data.parse(filteredOrders);
    //res.status(200).json(filteredOrders);
    res.status(200).type("text/csv").attachment("orders.csv").end(csv_data);
  } catch (error) {
    next(error);
  }
};

export const GetLastThreeMonthsStatistics = async (req, res, next) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    const startOfMonth1 = new Date(currentDate);
    startOfMonth1.setMonth(startOfMonth1.getMonth() - 1);
    startOfMonth1.setDate(1);

    const startOfMonth2 = new Date(startOfMonth1);
    startOfMonth2.setMonth(startOfMonth2.getMonth() - 1);

    const startOfMonth3 = new Date(startOfMonth2);
    startOfMonth3.setMonth(startOfMonth3.getMonth() - 1);

    const monthlyData = [];

    monthlyData.push(
      await calculateMonthStatistics(startOfMonth1, currentDate)
    );
    monthlyData.push(
      await calculateMonthStatistics(startOfMonth2, startOfMonth1)
    );
    monthlyData.push(
      await calculateMonthStatistics(startOfMonth3, startOfMonth2)
    );

    res.status(200).json(monthlyData);
  } catch (error) {
    next(error);
  }
};

const calculateMonthStatistics = async (startDate, endDate) => {
  const orders = await Order.find({
    createdAt: {
      $gte: new Date(startDate),
      $lt: new Date(endDate),
    },
    status: "Confirmed",
  });

  const profit = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const stickersSold = orders.reduce((acc, curr) => {
    return (
      acc + curr.stickerList.reduce((acc2, curr2) => acc2 + curr2.quantity, 0)
    );
  }, 0);

  return {
    name: startDate.toLocaleString("default", { month: "short" }),
    profit: profit.toFixed(2),
    stickers_sold: stickersSold,
    num_orders: orders.length,
  };
};
