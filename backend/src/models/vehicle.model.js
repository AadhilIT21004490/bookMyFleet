import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    
    fuelType: { type: String, required: true, enum: ["Petrol", "Diesel", "Hybrid", "Electric"] },
    transmission: { type: String, required: true, enum: ["Automatic", "Manual"] },
    
    seats: { type: Number, required: true },
    luggageCapacity: { type: Number },
    
    category: { 
      type: String, 
      required: true, 
      enum: ["SUV", "Sedan", "Luxury", "Van", "Mini", "Bus", "Other"] 
    },

    features: [String], // AC, GPS, etc.
    
    // Pricing
    pricePerDay1Week: { type: Number },
    pricePerDay2Weeks: { type: Number },
    pricePerDay3Weeks: { type: Number },
    pricePerDay1Month: { type: Number },
    pricePerDay3Months: { type: Number },
    pricePerDay6Months: { type: Number },

    availability: [
      {
        from: Date,
        to: Date,
        isAvailable: { type: Boolean, default: true }
      }
    ],

    images: [String], // Array of URLs

    isApproved: { type: Boolean, default: false }, // Admin approval
    isActive: { type: Boolean, default: true }, // Owner toggle
  },
  { timestamps: true }
);

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
