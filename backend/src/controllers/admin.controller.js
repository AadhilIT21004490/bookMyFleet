import Vendor from "../models/vendor.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import Booking from "../models/booking.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

// ─── Dashboard Overview ───────────────────────────────────────────────────────

export const getDashboardStats = async (req, res) => {
  try {
    const [totalVendors, totalUsers, totalVehicles, totalBookings,
           pendingVendors, pendingVehicles, activeVehicles] = await Promise.all([
      Vendor.countDocuments(),
      User.countDocuments(),
      Vehicle.countDocuments(),
      Booking.countDocuments(),
      Vendor.countDocuments({ isVerified: false }),
      Vehicle.countDocuments({ isApproved: false }),
      Vehicle.countDocuments({ isApproved: true, isActive: true }),
    ]);

    const recentVendors = await Vendor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email businessName isVerified isActive createdAt");

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "firstName lastName email")
      .populate("vehicle", "brand model");

    res.json({
      stats: { totalVendors, totalUsers, totalVehicles, totalBookings,
               pendingVendors, pendingVehicles, activeVehicles },
      recentVendors,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Vendor Management ────────────────────────────────────────────────────────

export const getAllVendors = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status === "pending") filter.isVerified = false;
    if (status === "active") { filter.isVerified = true; filter.isActive = true; }
    if (status === "blocked") filter.isActive = false;

    const vendors = await Vendor.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password");

    const total = await Vendor.countDocuments(filter);
    res.json({ vendors, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("-password");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const totalVehicles = await Vehicle.countDocuments({ vendor: vendor._id });
    const totalBookings = await Booking.countDocuments({ vendor: vendor._id });
    const activeVehiclesList = await Vehicle.find({ vendor: vendor._id, isActive: true, isApproved: true }).sort({ createdAt: -1 });

    res.json({ vendor, totalVehicles, totalBookings, activeVehiclesList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { isVerified: true, isActive: true },
      { new: true }
    ).select("-password");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor approved successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { isVerified: false, isActive: false },
      { new: true }
    ).select("-password");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor rejected", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleVendorBlock = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const newIsActive = !vendor.isActive;
    await Vendor.updateOne({ _id: vendor._id }, { isActive: newIsActive });

    // If blocking, hide all their vehicles
    if (!newIsActive) {
      await Vehicle.updateMany({ vendor: vendor._id }, { isActive: false });
    }

    vendor.isActive = newIsActive;
    res.json({ message: `Vendor ${vendor.isActive ? "unblocked" : "blocked"}`, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── User Management ──────────────────────────────────────────────────────────

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password");

    const total = await User.countDocuments();
    res.json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const newIsActive = !user.isActive;
    await User.updateOne({ _id: user._id }, { isActive: newIsActive });
    
    user.isActive = newIsActive;
    res.json({ message: `User ${user.isActive ? "activated" : "deactivated"}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Vehicle Management ───────────────────────────────────────────────────────

export const getAllVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status === "pending") filter.isApproved = false;
    if (status === "approved") filter.isApproved = true;

    const vehicles = await Vehicle.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("vendor", "fullName businessName email");

    const total = await Vehicle.countDocuments(filter);
    res.json({ vehicles, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle approved", vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { isApproved: false, isActive: false },
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle rejected", vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Booking Management ───────────────────────────────────────────────────────

export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("user", "firstName lastName email")
      .populate("vendor", "fullName businessName")
      .populate("vehicle", "brand model year");

    const total = await Booking.countDocuments(filter);
    res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Admin Seed ───────────────────────────────────────────────────────────────

export const seedAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne({ email: "admin@bookmyfleet.lk" });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash("Admin@1234", 10);
    const admin = await Admin.create({
      email: "admin@bookmyfleet.lk",
      password: hashed,
      name: "Super Admin",
    });
    res.status(201).json({ message: "Admin created", email: admin.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
