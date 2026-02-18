import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import Admin from "../models/admin.model.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, ENV.JWT_SECRET);

      // Check which role matches
      // We can encode role in token to make this faster
      if (decoded.role === "User") {
        req.user = await User.findById(decoded.id).select("-password");
      } else if (decoded.role === "Vendor") {
        req.user = await Vendor.findById(decoded.id).select("-password");
        req.isVendor = true;
      } else if (decoded.role === "Admin") {
        req.user = await Admin.findById(decoded.id).select("-password");
        req.isAdmin = true;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

export const vendorOnly = (req, res, next) => {
    if (req.user && req.isVendor) {
      next();
    } else {
      res.status(401).json({ message: "Not authorized as a vendor" });
    }
  };
