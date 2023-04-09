import express from "express";
import {
  EmptyCart,
  GetCartItems,
  RemoveItemFromCart,
  UpdateCart,
} from "../controllers/UserCartController.js";

const router = express.Router();

router.get("/:id", GetCartItems);

router.post("/update-cart", UpdateCart);

router.post("/remove-item-from-cart", RemoveItemFromCart);

router.post("/empty-cart", EmptyCart);

export default router;
