import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log(`Database connected on: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
