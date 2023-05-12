import express from "express";
import {
  ConfirmOrder,
  GetAllOrders,
  GetAllTimeStatistics,
  GetOrder,
  GetOrderStatistics,
  GetOrdersByUser,
  GetPlacedOrders,
  PlaceOrder,
  SetRating,
  StatisticsByCategory,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", GetAllOrders);

router.post("/", PlaceOrder);

router.get("/:id", GetOrder);

router.get("/my-orders/:user_id", GetOrdersByUser);

router.get("/get/placed", GetPlacedOrders);

router.get("/get/statistics", GetOrderStatistics);

router.get("/get/all-time-statistics", GetAllTimeStatistics);

router.get("/get/category-statistics", StatisticsByCategory);

router.post("/confirm", ConfirmOrder);

router.post("/set-rating", SetRating);

export default router;
