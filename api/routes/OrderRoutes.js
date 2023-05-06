import express from "express";
import { ConfirmOrder, GetAllOrders, GetOrder, GetOrdersByUser, GetPlacedOrders, PlaceOrder } from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", GetAllOrders);

router.post("/", PlaceOrder);

router.get("/:id", GetOrder);

router.get("/my-orders/:user_id", GetOrdersByUser);

router.get("/get/placed", GetPlacedOrders);

router.post("/confirm", ConfirmOrder);

export default router;
