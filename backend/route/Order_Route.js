const {placeOrder,getUserOrders,getSingleOrder,createRazorpayOrder} = require("../controller/Order_Controller");

const express = require("express");
const order_router = express.Router();
const auth = require("../middleware/auth");

order_router.post("/placeorder", auth, placeOrder);
order_router.get("/myorders", auth, getUserOrders);
order_router.get("/order/:id", auth, getSingleOrder);
order_router.post("/create-razorpay-order", auth, createRazorpayOrder);


module.exports = order_router;

