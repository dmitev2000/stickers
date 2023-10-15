import express from "express";
import {
  AddMultipleStickersToCart,
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

router.post("/update-cart/:user_id", VerifyToken, VerifyUser, UpdateCart);

router.post("/add-multiple/:user_id", VerifyToken, VerifyUser, AddMultipleStickersToCart);

router.post("/increment-quantity/:user_id", IncrementQuantity);

router.post("/decrement-quantity/:user_id", DecrementQuantity);

router.post("/remove-item-from-cart/:user_id", RemoveItemFromCart);

router.delete("/empty-cart/:user_id", VerifyToken, VerifyUser, EmptyCart);

export default router;
