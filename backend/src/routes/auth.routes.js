import express from "express";
import { registerUser, login, getProfile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/profile", protect, getProfile);

export default router;
