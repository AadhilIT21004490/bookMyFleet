// middlewares/uploadVendorDocs.js
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/vendors";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const businessName =
      req.body.businessName?.replace(/\s+/g, "_") || "business";
    const fullName = req.body.fullName?.replace(/\s+/g, "_") || "user";
    const ext = path.extname(file.originalname);
    const field = file.fieldname; // e.g. nicPicture, brDocument, etc.

    cb(null, `${businessName}-${fullName}-${field}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error("Only JPG, PNG and PDF files are allowed"), false);
};

export const uploadVendorDocs = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter,
}).fields([
  { name: "nicPicture", maxCount: 1 },
  { name: "brDocument", maxCount: 1 },
  { name: "proofOfAddress", maxCount: 1 },
  { name: "rentalAgreement", maxCount: 1 },
  { name: "businessProfilePicture", maxCount: 1 },
]);
