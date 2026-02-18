const {add_or_update_cart,ShowCart,Delete_Cart} = require("../controller/Cart_Contoller")
const auth = require("../middleware/auth");
const express = require("express");
const cart_router = express.Router();

cart_router.post("/cart", auth, add_or_update_cart);
cart_router.get("/cartshow", auth, ShowCart);
cart_router.delete("/cartdelete/:id", auth, Delete_Cart);

module.exports = cart_router