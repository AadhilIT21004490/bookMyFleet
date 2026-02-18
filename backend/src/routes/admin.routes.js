import express from "express";
import {
  getDashboardStats,
  getAllVendors, getVendorById, approveVendor, rejectVendor, toggleVendorBlock,
  getAllUsers, toggleUserActive,
  getAllVehicles, approveVehicle, rejectVehicle,
  getAllBookings,
  seedAdmin,
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Seed (dev only – remove in production)
router.post("/seed", seedAdmin);

// All routes below require admin auth
router.use(protect, adminOnly);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Vendors
router.get("/vendors", getAllVendors);
router.get("/vendors/:id", getVendorById);
router.put("/vendors/:id/approve", approveVendor);
router.put("/vendors/:id/reject", rejectVendor);
router.put("/vendors/:id/toggle-block", toggleVendorBlock);

// Users
router.get("/users", getAllUsers);
router.put("/users/:id/toggle-active", toggleUserActive);

// Vehicles
router.get("/vehicles", getAllVehicles);
router.put("/vehicles/:id/approve", approveVehicle);
router.put("/vehicles/:id/reject", rejectVehicle);

// Bookings
router.get("/bookings", getAllBookings);

export default router;
