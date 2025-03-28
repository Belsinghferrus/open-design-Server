import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register",authMiddleware, register);
router.post("/login",authMiddleware, login);

export default router;
