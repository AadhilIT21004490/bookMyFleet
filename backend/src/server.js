import express from "express";
import { connectDB } from "./configs/db.js";
import { ENV } from "./configs/env.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

const app = express();

// Databse connection
await connectDB();

// Middlewares
app.use(express.json());
app.use(arcjetMiddleware);

const port = ENV.PORT || 8001;

app.listen(port, () => console.log(`Server is up and running on ${port}`));
