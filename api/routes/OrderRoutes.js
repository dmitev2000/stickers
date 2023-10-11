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
import { VerifyAdmin, VerifyToken, VerifyUser } from "../middlewares/Restrict.js";

const router = express.Router();

router.get("/", VerifyToken, VerifyAdmin, GetAllOrders);

router.post("/", VerifyToken, PlaceOrder);

router.get("/:id", VerifyToken, VerifyUser, GetOrder);

router.get("/my-orders/:user_id", VerifyToken, VerifyUser, GetOrdersByUser);

router.get("/get/placed", VerifyToken, VerifyAdmin, GetPlacedOrders);

router.get("/get/statistics", VerifyToken, VerifyAdmin, GetOrderStatistics);

router.get("/get/all-time-statistics", VerifyToken, VerifyAdmin, GetAllTimeStatistics);

router.get("/get/category-statistics", VerifyToken, VerifyAdmin, StatisticsByCategory);

router.get("/get/current-month-statistics", VerifyToken, VerifyAdmin, CurrentMonthStatistics);

router.get("/get/rating-stats", VerifyToken, VerifyAdmin, RatingStats);

router.post("/confirm", VerifyToken, VerifyAdmin, ConfirmOrder);

router.post("/set-rating", VerifyToken, VerifyUser, SetRating);

export default router;
