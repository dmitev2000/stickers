import express from "express";
import { GetAllOrders, GetOrder, GetOrdersByUser, PlaceOrder } from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", GetAllOrders);

router.post("/", PlaceOrder);

router.get("/:id", GetOrder);

router.get("/get-my-orders", GetOrdersByUser);

export default router;
