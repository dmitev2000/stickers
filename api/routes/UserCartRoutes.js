import express from "express";
import {
  DecrementQuantity,
  EmptyCart,
  GetCartItems,
  IncrementQuantity,
  RemoveItemFromCart,
  UpdateCart,
} from "../controllers/UserCartController.js";
import { VerifyToken, VerifyUser } from "../middlewares/Restrict.js";

const router = express.Router();

router.get("/:user_id", VerifyToken, VerifyUser, GetCartItems);

router.post("/update-cart", UpdateCart);

router.post("/increment-quantity", IncrementQuantity);

router.post("/decrement-quantity", DecrementQuantity);

router.post("/remove-item-from-cart", RemoveItemFromCart);

router.delete("/empty-cart/:user_id", VerifyToken, VerifyUser, EmptyCart);

export default router;
