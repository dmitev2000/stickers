import express from "express";
import { GetUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/:id", GetUser);

export default router;
