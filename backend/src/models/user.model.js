import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // phone: { type: String, required: true, unique: true }, 
    // Phone might be optional for social login or added later
    phone: { type: String },
    
    profilePicture: { type: String, default: "" },
    
    role: { type: String, default: "User", enum: ["User", "Admin"] }, // Admin can also use this model or separate

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
