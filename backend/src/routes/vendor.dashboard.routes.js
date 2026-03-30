import express from "express";
import {
  getVendorDashboard,
  getMyVehicles, addVehicle, updateVehicle, deleteVehicle,
  getMyBookings, updateBookingStatus,
  getVendorProfile, updateVendorProfile,
} from "../controllers/vendor.dashboard.controller.js";
import { protect, vendorOnly } from "../middlewares/auth.middleware.js";
import { uploadVehicleImages } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(protect, vendorOnly);

// Dashboard
router.get("/dashboard", getVendorDashboard);

// Vehicles
router.get("/vehicles", getMyVehicles);
router.post("/vehicles", uploadVehicleImages, addVehicle);
router.put("/vehicles/:id", uploadVehicleImages, updateVehicle);
router.delete("/vehicles/:id", deleteVehicle);

// Bookings
router.get("/bookings", getMyBookings);
router.put("/bookings/:id/status", updateBookingStatus);

// Profile
router.get("/profile", getVendorProfile);
router.put("/profile", updateVendorProfile);

export default router;
