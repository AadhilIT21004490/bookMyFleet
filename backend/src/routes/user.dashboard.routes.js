import express from "express";
import {
  getMyBookings, cancelBooking,
  getUserProfile, updateUserProfile,
} from "../controllers/user.dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/bookings", getMyBookings);
router.put("/bookings/:id/cancel", cancelBooking);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;
