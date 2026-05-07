const {register, login, profile, sendOtp, verifyOtp, resetPassword} = require("../controller/Account_Controller")
const express = require("express");
const auth = require("../middleware/auth");

const account_router = express.Router();

account_router.post("/register", register);
account_router.post("/login", login);
account_router.get("/profile", auth, profile)
account_router.post("/send-otp", sendOtp);
account_router.post("/verify-otp", verifyOtp);
account_router.post("/reset-password", resetPassword);

module.exports = account_router
