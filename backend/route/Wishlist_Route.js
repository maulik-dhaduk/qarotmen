const {toggleWishlist,getWishlist} = require("../controller/Wishlist_Controller")
const express = require("express");
const auth = require("../middleware/auth");

const wishlist_router = express.Router();

wishlist_router.post("/wishlist-toggle",auth, toggleWishlist)
wishlist_router.get("/wishlist",auth, getWishlist)

module.exports = wishlist_router