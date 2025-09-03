import express from "express";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { ENV } from "./configs/env.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
import vendorRoutes from "./routes/vendor.routes.js";

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

app.listen(port, () => console.log(`Server is up and running on ${port}`));
