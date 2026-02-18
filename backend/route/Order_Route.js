const {placeOrder,getUserOrders,getSingleOrder} = require("../controller/Order_Controller");

const express = require("express");
const order_router = express.Router();
const auth = require("../middleware/auth");

order_router.post("/placeorder", auth, placeOrder);
order_router.get("/myorders", auth, getUserOrders);
order_router.get("/order/:id", auth, getSingleOrder);


module.exports = order_router;
