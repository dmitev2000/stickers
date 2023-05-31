import express from "express";
import { DeleteUser, GetCustomers, GetUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/:id", GetUser);

router.get("/", GetCustomers);

router.delete("/:id", DeleteUser);

export default router;
