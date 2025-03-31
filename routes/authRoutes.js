import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
