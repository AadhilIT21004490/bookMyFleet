import mongoose, { mongo } from "mongoose";

const fleetSchema = new mongoose.Schema(
  {
    // meta
    fleetId: { type: String, required: true, unique: true },
    views: { type: Number, default: 0 },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    //   car info
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    yom: { type: String, required: true },
    vehicleType: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    description: { type: String, required: true },
    doors: { type: Number, required: true },
    seats: { type: Number, required: true },
    //   car features
    kmPerDay: { type: Number, required: true },
    luggageCapacity: {
      largeLuggage: { type: Number, default: 1 },
      handLuggage: { type: Number, default: 0 },
    },
    amenities: { type: [String], required: true },
    //   price table
    priceTable: {
      oneWeekandBelow: { type: Number, required: true },
      twoWeeks: { type: Number, required: true },
      threeWeeks: { type: Number, required: true },
      oneMonth: { type: Number, required: true },
      threeMonths: { type: Number, required: true },
      sixMonthsAndAbove: { type: Number, required: true },
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 6;
        },
        message: "Images array must have between 1 and 6 items",
      },
    },
    // flags
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false }, //only trigger by admin
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Fleet = mongoose.models.Fleet || mongoose.model("Fleet", fleetSchema);
export default Fleet;
