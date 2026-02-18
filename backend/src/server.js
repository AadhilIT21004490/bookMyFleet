import express from "express";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { ENV } from "./configs/env.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
import vendorRoutes from "./routes/vendor.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import vendorDashboardRoutes from "./routes/vendor.dashboard.routes.js";
import userDashboardRoutes from "./routes/user.dashboard.routes.js";
import vehiclesRoutes from "./routes/vehicles.routes.js";

const app = express();

// Databse connection
await connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(arcjetMiddleware);

const port = ENV.PORT || 8001;

// Routes
app.use("/api/health", (req, res) =>
  res.status(200).json("Im healthy dont worry :)")
);
app.use("/api/vendor", vendorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor-dashboard", vendorDashboardRoutes);
app.use("/api/user-dashboard", userDashboardRoutes);
app.use("/api/vehicles", vehiclesRoutes);

app.listen(port, () => console.log(`Server is up and running on ${port}`));
