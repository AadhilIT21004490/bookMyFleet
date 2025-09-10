import Vendor from "../models/vendor.model.js";

export const generateVendorId = async () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // ensures 4 digits

  const isInDb = await Vendor.findOne({ vendorId: `BMF-V-${randomNum}` });
  if (isInDb) {
    return generateVendorId();
  }
  return `BMF-V-${randomNum}`;
};
