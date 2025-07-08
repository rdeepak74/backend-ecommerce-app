import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me',isAuthenticated,getMe)

export default router;