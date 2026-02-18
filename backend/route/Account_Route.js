const {register, login, profile} = require("../controller/Account_Controller")
const express = require("express");
const auth = require("../middleware/auth");

const account_router = express.Router();

account_router.post("/register", register);
account_router.post("/login", login);
account_router.get("/profile", auth, profile)
module.exports = account_router