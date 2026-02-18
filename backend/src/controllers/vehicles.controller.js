import Vehicle from "../models/vehicle.model.js";
import Booking from "../models/booking.model.js";

// ─── Public: List approved vehicles ──────────────────────────────────────────

export const getPublicVehicles = async (req, res) => {
  try {
    const { category, fuelType, transmission, seats, minPrice, maxPrice, city, page = 1, limit = 12 } = req.query;

    const filter = { isApproved: true, isActive: true };
    if (category) filter.category = category;
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (seats) filter.seats = Number(seats);

    // Price filter on 1-week rate as baseline
    if (minPrice || maxPrice) {
      filter.pricePerDay1Week = {};
      if (minPrice) filter.pricePerDay1Week.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay1Week.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("vendor", "fullName businessName operatingCity phone");

    // Filter by city after populate (vendor's city)
    const filtered = city
      ? vehicles.filter(v => v.vendor?.operatingCity?.toLowerCase().includes(city.toLowerCase()))
      : vehicles;

    const total = await Vehicle.countDocuments(filter);

    res.json({ vehicles: filtered, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Public: Get single vehicle ───────────────────────────────────────────────

export const getPublicVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, isApproved: true, isActive: true })
      .populate("vendor", "fullName businessName operatingCity phone email");

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Authenticated: Create booking ───────────────────────────────────────────

export const createBooking = async (req, res) => {
  try {
    const { vehicleId, pickupDate, dropoffDate, pickupLocation, dropoffLocation, notes } = req.body;

    const vehicle = await Vehicle.findOne({ _id: vehicleId, isApproved: true, isActive: true });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found or not available" });

    // Calculate duration and price
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
    if (days < 1) return res.status(400).json({ message: "Invalid dates" });

    // Pick the best rate tier
    let pricePerDay = vehicle.pricePerDay1Week || 0;
    if (days >= 180 && vehicle.pricePerDay6Months) pricePerDay = vehicle.pricePerDay6Months;
    else if (days >= 90 && vehicle.pricePerDay3Months) pricePerDay = vehicle.pricePerDay3Months;
    else if (days >= 30 && vehicle.pricePerDay1Month) pricePerDay = vehicle.pricePerDay1Month;
    else if (days >= 21 && vehicle.pricePerDay3Weeks) pricePerDay = vehicle.pricePerDay3Weeks;
    else if (days >= 14 && vehicle.pricePerDay2Weeks) pricePerDay = vehicle.pricePerDay2Weeks;

    const totalPrice = pricePerDay * days;

    const booking = await Booking.create({
      user: req.user._id,
      vendor: vehicle.vendor,
      vehicle: vehicleId,
      pickupDate: pickup,
      dropoffDate: dropoff,
      totalPrice,
      pickupLocation,
      dropoffLocation,
      notes,
      status: "Pending",
      paymentStatus: "Pending",
    });

    res.status(201).json({ message: "Booking created successfully", booking, totalPrice, days, pricePerDay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
