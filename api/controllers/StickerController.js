import Order from "../models/OrderModel.js";
import RejectedSticker from "../models/RejectedStickerModel.js";
import Sticker from "../models/StickerModel.js";
import { CreateError } from "../utils/Error.js";
import Jimp from "jimp";

export const GetStickers = async (req, res, next) => {
  try {
    const stickers = await Sticker.find({ status: "Valid" }).sort({
      createdAt: -1,
    });
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const GetStickerById = async (req, res, next) => {
  try {
    const sticker = await Sticker.findById(req.params.id);
    if (!sticker) {
      return next(CreateError(404, "Sticker not found."));
    }
    res.status(200).json(sticker);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return next(CreateError(400, "Bad request (invalid ID)."));
    }
    next(error);
  }
};

export const GetStickersFromOrder = async (req, res, next) => {
  try {
    const stickerIDs = req.body.stickerIDs.map((s) => {
      return s.stickerID;
    });

    const stickers = await Sticker.find({ _id: { $in: stickerIDs } });

    const dataToReturn = stickers.map((s, index) => {
      return { sticker: s, quantity: req.body.stickerIDs[index].quantity };
    });

    res.status(200).json(dataToReturn);
  } catch (error) {
    next(error);
  }
};

export const GetPendingStickers = async (req, res, next) => {
  try {
    const pendingStickers = await Sticker.find({ status: "Pending" });
    res.status(200).json(pendingStickers);
  } catch (error) {
    next(error);
  }
};

export const AddSticker = async (req, res, next) => {
  try {
    const imageFileName = req.file.originalname;

    const image = await Jimp.read(`./uploads/${imageFileName}`);

    const result = [];
    image.resize(50, 50);
    for (let i = 0; i < image.getWidth(); i++) {
      for (let j = 0; j < image.getHeight(); j++) {
        if (!result.includes(image.getPixelColor(i, j))) {
          result.push(image.getPixelColor(i, j));
        }
      }
    }

    const newSticker = new Sticker({
      title: req.body.title,
      image: imageFileName,
      price: (result.length * 0.001).toFixed(2),
      company: req.body.company,
      tags: req.body.tag,
      by: req.params.by ? req.params.by : "Community",
    });

    await newSticker.save();

    res.status(201).json("Sticker successfully added.");
  } catch (error) {
    next(error);
  }
};

export const UpdateStickerStatus = async (req, res, next) => {
  try {
    const sticker = await Sticker.findById({ _id: req.body.sticker._id });

    if (!sticker) {
      return next(CreateError(404, "Sticker not found."));
    }

    await Sticker.updateOne(
      { _id: req.body.sticker._id },
      { $set: { status: req.body.status, reviewed: true } }
    );

    if (req.body.status === "Rejected") {
      const updated = await Sticker.findById({ _id: req.body.sticker._id });
      const { _id, __v, ...otherProps } = updated._doc;
      await RejectedSticker.create({
        sticker: otherProps,
        reason: req.body.reason,
      });
      await Sticker.deleteOne({ _id: req.body.sticker._id });
    }

    res.status(200).json(`Sticker (${req.body.sticker.title}) status updated.`);
  } catch (error) {
    next(error);
  }
};

export const GetPopularStickers = async (req, res, next) => {
  try {
    const confirmedOrders = await Order.find({ status: "Confirmed" }).select(
      "stickerList"
    );
    const result = {};
    confirmedOrders.forEach((order) => {
      order.stickerList.forEach((item) => {
        if (!result.hasOwnProperty(item.stickerID)) {
          result[item.stickerID] = { orders: 1, count: item.quantity };
        } else {
          result[item.stickerID] = {
            orders: result[item.stickerID].orders + 1,
            count: result[item.stickerID].count + item.quantity,
          };
        }
      });
    });
    const array = Object.keys(result).map((key) => ({ [key]: result[key] }));
    const topThree = array
      .map((item) => ({
        stickerID: Object.keys(item)[0],
        data: Object.values(item)[0],
      }))
      .sort((a, b) => b.data.count - a.data.count)
      .slice(0, 3);
    const ids = topThree.map((s) => s.stickerID);
    const stickerData = await Sticker.find({ _id: { $in: ids } });
    res.status(200).json({ topThree, stickerData });
  } catch (error) {
    next(error);
  }
};
