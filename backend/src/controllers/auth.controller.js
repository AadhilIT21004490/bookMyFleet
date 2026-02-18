import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, ENV.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register-user
// @access  Public
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: "User",
        token: generateToken(user._id, "User"),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};

// @desc    Login user/admin/vendor
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password, role } = req.body; // role is optional, can infer or try all

  try {
    let user;
    let foundRole = role;

    // Try to find in User
    if (!foundRole || foundRole === "User") {
        user = await User.findOne({ email });
        if(user) foundRole = "User";
    }
    
    // Try Vendor
    if (!user && (!foundRole || foundRole === "Vendor")) {
        user = await Vendor.findOne({ email });
        if(user) foundRole = "Vendor";
    }

    // Try Admin
    if (!user && (!foundRole || foundRole === "Admin")) {
        user = await Admin.findOne({ email });
        if(user) foundRole = "Admin";
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.firstName || user.fullName || user.name,
        email: user.email,
        role: foundRole,
        token: generateToken(user._id, foundRole),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    // req.user is set by middleware
    if(req.user) {
        res.json(req.user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}
