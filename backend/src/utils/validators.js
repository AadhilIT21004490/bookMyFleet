import {
  emailRegex,
  sriLankaMobileRegex,
  nicRegex,
  brNumberRegex,
  passwordRegex,
  fullNameRegex,
} from "./regex.js";

export const isValidEmail = (email) => emailRegex.test(email);
export const isValidPhone = (phone) => sriLankaMobileRegex.test(phone);
export const isValidNIC = (nic) => nicRegex.test(nic);
export const isValidBrNumber = (brNumber) => brNumberRegex.test(brNumber);
export const isValidPassword = (password) => passwordRegex.test(password);
export const isValidFullname = (fullName) => fullNameRegex.test(fullName);
