import express from "express";
import { getPublicVehicles, getPublicVehicleById, createBooking } from "../controllers/vehicles.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getPublicVehicles);
router.get("/:id", getPublicVehicleById);

// Authenticated: create booking
router.post("/:id/book", protect, createBooking);

export default router;
