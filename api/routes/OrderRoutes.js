import express from "express";
import {
  ConfirmOrder,
  CurrentMonthStatistics,
  GetAllOrders,
  GetAllTimeStatistics,
  GetOrder,
  GetOrderStatistics,
  GetOrdersByUser,
  GetPlacedOrders,
  PlaceOrder,
  RatingStats,
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

router.get("/get/current-month-statistics", CurrentMonthStatistics);

router.get("/get/rating-stats", RatingStats);

router.post("/confirm", ConfirmOrder);

router.post("/set-rating", SetRating);

export default router;
