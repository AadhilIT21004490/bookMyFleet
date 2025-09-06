import bcrypt from "bcryptjs";
import {
  isValidBrNumber,
  isValidEmail,
  isValidFullname,
  isValidNIC,
  isValidPassword,
  isValidPhone,
} from "../utils/validators.js";
import Vendor from "../models/vendor.model.js";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      nicNumber,
      emergencyContact,
      businessName,
      businessType,
      businessRegNumber,
      businessOverview,
      officeAddress,
      officeContact,
      operatingCity,
    } = req.body;

    let { languages } = req.body;

    // Grab files uploaded by Multer
    const nicPicture = req.files?.nicPicture?.[0]?.filename || null;
    const brDocument = req.files?.brDocument?.[0]?.filename || null;
    const proofOfAddress = req.files?.proofOfAddress?.[0]?.filename || null;
    const rentalAgreement = req.files?.rentalAgreement?.[0]?.filename || null;
    const paymentProof = req.files?.paymentProof?.[0]?.filename || null;
    const businessProfilePicture =
      req.files?.businessProfilePicture?.[0]?.filename || null;

    if (
      !fullName ||
      !email ||
      !password ||
      !phone ||
      !languages ||
      !nicNumber ||
      !emergencyContact ||
      !businessName ||
      !businessType ||
      !officeAddress ||
      !officeContact ||
      !operatingCity ||
      !nicPicture ||
      !proofOfAddress ||
      !paymentProof

    ) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Please provide all the required fields",
        success: false,
      });
    }

    // validate inputs starts
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    const isFullNameValid = isValidFullname(fullName);
    const isPhoneValid = isValidPhone(phone);
    const isEmergencyContactValid = isValidPhone(emergencyContact);
    const isOfficeContactValid = isValidPhone(officeContact);
    const isNICValid = isValidNIC(nicNumber);

    if (!isOfficeContactValid) {
      return res.status(400).json({
        error: "Invalid office contact",
        message: "Please provide a valid office contact",
        success: false,
      });
    }

    if (!isEmergencyContactValid) {
      return res.status(400).json({
        error: "Invalid emergency contact",
        message: "Please provide a valid emergency contact",
        success: false,
      });
    }

    // Parse if string
    if (typeof languages === "string") {
      try {
        languages = JSON.parse(languages);
      } catch (err) {
        return res.status(400).json({
          error: "Invalid languages format",
          message: "Languages must be a valid JSON object",
          success: false,
        });
      }
    }

    if (languages.length < 1) {
      return res.status(400).json({
        error: "Invalid languages",
        message: "Please provide at least one language",
        success: false,
      });
    }

    if (!isPhoneValid) {
      return res.status(400).json({
        error: "Invalid phone number",
        message: "Please provide a valid phone number",
        success: false,
      });
    }

    if (!isNICValid) {
      return res.status(400).json({
        error: "Invalid NIC number",
        message: "Please provide a valid NIC number",
        success: false,
      });
    }

    if (!isFullNameValid) {
      return res.status(400).json({
        error: "Invalid full name",
        message: "Please provide a valid full name",
        success: false,
      });
    }

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid password",
        message: "Please provide a valid password",
        success: false,
      });
    }

    if (
      businessRegNumber.trim() !== "" &&
      !isValidBrNumber(businessRegNumber)
    ) {
      return res.status(400).json({
        error: "Invalid BR number",
        message: "Please provide a valid BR number",
        success: false,
      });
    }

    if (!isEmailValid) {
      return res.status(400).json({
        error: "Invalid email",
        message: "Please provide a valid email address",
        success: false,
      });
    }

   
    // validate inputs ends

    // db level validation for uniqueness starts
    const existingUser = await Vendor.findOne({
      $or: [
        { email },
        { nicNumber },
        { phone },
        { businessRegNumber },
        { businessName },
      ],
    });

    if (existingUser) {
      let conflictField = "";
      if (existingUser.email === email) conflictField = "email";
      else if (existingUser.nicNumber === nicNumber)
        conflictField = "NIC number";
      else if (existingUser.phone === phone) conflictField = "phone number";
      else if (existingUser.businessRegNumber === businessRegNumber)
        conflictField = "business registration number";
      else if (existingUser.businessName === businessName)
        conflictField = "business name";

      return res.status(400).json({
        error: "Duplicate Entry",
        message: `A vendor with this ${conflictField} already exists.`,
        field: conflictField,
        success: false,
      });
    }
    // db level validation for uniqueness ends

    // todo: need to implement file upload here or in the middleware

    const vendor = new Vendor({
      fullName,
      email,
      password: bcrypt.hashSync(password, 10),
      phone,
      languages,
      nicNumber,
      emergencyContact,
      businessName,
      businessType,
      businessRegNumber,
      businessOverview,
      officeAddress,
      officeContact,
      operatingCity,
      nicPicture,
      brDocument,
      proofOfAddress,
      rentalAgreement,
      businessProfilePicture,
      paymentProof
    });

    const savedVendor = await vendor.save();

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      vendor: savedVendor,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
      message: error.message,
      success: false,
    });
  }
};
