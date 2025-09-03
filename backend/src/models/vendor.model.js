import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    // Step 1 - Personal
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    languages: {
      English: { type: Boolean, default: false },
      Tamil: { type: Boolean, default: false },
      Sinhala: { type: Boolean, default: false },
    },
    nicNumber: { type: String, required: true, unique: true },
    emergencyContact: { type: String, required: true },

    // Step 2 - Business
    businessName: { type: String, required: true, unique: true },
    businessType: {
      type: String,
      enum: ["Individual", "Registered Company"],
      default: "Individual",
    },
    businessRegNumber: { type: String, unique: true },
    businessOverview: { type: String, required: true },
    officeAddress: { type: String, required: true },
    officeContact: { type: String, required: true },
    operatingCity: { type: String, required: true },

    // Step 3 - Documents (store file paths/URLs)
    nicPicture: { type: String, required: true },
    brDocument: { type: String }, // optional
    proofOfAddress: { type: String, required: true },
    rentalAgreement: { type: String, required: true },
    businessProfilePicture: { type: String, required: true },

    // Optional (future use)
    taxId: { type: String },
    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      bankName: String,
      branch: String,
    },
    socialLinks: {
      website: String,
      facebook: String,
      instagram: String,
    },

    // Status flags
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;
