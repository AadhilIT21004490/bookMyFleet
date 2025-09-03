import express from "express";
import { register } from "../controllers/vendor.controller.js";
import { uploadVendorDocs } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", uploadVendorDocs, register);

export default router;
