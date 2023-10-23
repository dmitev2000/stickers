import express from "express";
import {
  CancelOrder,
  ConfirmOrder,
  CurrentMonthStatistics,
  ExportOrdersToCSV,
  GetAllOrders,
  GetAllTimeStatistics,
  GetConfirmedOrders,
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

router.get("/get/my-orders/:user_id", VerifyToken, VerifyUser, GetOrdersByUser);

router.get("/get/placed", VerifyToken, VerifyAdmin, GetPlacedOrders);

router.get("/get/confirmed", VerifyToken, VerifyAdmin, GetConfirmedOrders);

router.get("/get/statistics", VerifyToken, VerifyAdmin, GetOrderStatistics);

router.get("/get/all-time-statistics", VerifyToken, VerifyAdmin, GetAllTimeStatistics);

router.get("/get/category-statistics", VerifyToken, VerifyAdmin, StatisticsByCategory);

router.get("/get/current-month-statistics", VerifyToken, VerifyAdmin, CurrentMonthStatistics);

router.get("/get/rating-stats", VerifyToken, VerifyAdmin, RatingStats);

router.get("/:order_id/:user_id", VerifyToken, VerifyUser, GetOrder);

router.get("/:order_id/:user_id/admin", VerifyToken, VerifyAdmin, GetOrder);

router.get("/export-orders-to-csv", VerifyToken, VerifyAdmin, ExportOrdersToCSV);

router.post("/confirm", VerifyToken, VerifyAdmin, ConfirmOrder);

router.post("/set-rating/:user_id", VerifyToken, VerifyUser, SetRating);

router.delete("/cancel-order/:order_id/:user_id", VerifyToken, VerifyUser, CancelOrder);

export default router;
