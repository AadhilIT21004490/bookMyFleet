import Vehicle from "../models/vehicle.model.js";
import Booking from "../models/booking.model.js";
import Vendor from "../models/vendor.model.js";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const getVendorDashboard = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const [totalVehicles, activeVehicles, pendingBookings, approvedBookings] = await Promise.all([
      Vehicle.countDocuments({ vendor: vendorId }),
      Vehicle.countDocuments({ vendor: vendorId, isActive: true, isApproved: true }),
      Booking.countDocuments({ vendor: vendorId, status: "Pending" }),
      Booking.countDocuments({ vendor: vendorId, status: "Approved" }),
    ]);

    const recentBookings = await Booking.find({ vendor: vendorId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "firstName lastName email phone")
      .populate("vehicle", "brand model year");

    res.json({ stats: { totalVehicles, activeVehicles, pendingBookings, approvedBookings }, recentBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Vehicles ─────────────────────────────────────────────────────────────────

export const getMyVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ vendor: req.user._id }).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle({ ...req.body, vendor: req.user._id, isApproved: false });
    const saved = await vehicle.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, vendor: req.user._id });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    Object.assign(vehicle, req.body);
    const saved = await vehicle.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, vendor: req.user._id });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const getMyBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { vendor: req.user._id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email phone")
      .populate("vehicle", "brand model year");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOne({ _id: req.params.id, vendor: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();
    res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user._id).select("-password");
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVendorProfile = async (req, res) => {
  try {
    const allowed = ["businessOverview", "officeAddress", "officeContact", "operatingCity", "socialLinks", "bankDetails"];
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    const vendor = await Vendor.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
