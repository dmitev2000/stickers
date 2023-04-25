import express from "express";
import {
  DecrementQuantity,
  EmptyCart,
  GetCartItems,
  IncrementQuantity,
  RemoveItemFromCart,
  UpdateCart,
} from "../controllers/UserCartController.js";

const router = express.Router();

router.get("/:id", GetCartItems);

router.post("/update-cart", UpdateCart);

router.post("/increment-quantity", IncrementQuantity);

router.post("/decrement-quantity", DecrementQuantity);

router.post("/remove-item-from-cart", RemoveItemFromCart);

router.post("/empty-cart", EmptyCart);

export default router;
