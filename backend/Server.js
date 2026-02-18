require("dotenv").config();

const db = require("./config/db")
const express = require("express");
const cors = require("cors");
const product_router = require("./route/Product_Route")
const account_router = require("./route/Account_Route")
const wishlist_router = require("./route/Wishlist_Route")
const cart_router = require("./route/Cart_Route")
const order_router = require("./route/Order_Route")
const {default_product} = require("./controller/Product_Controller")
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use("/upload", express.static("upload"));

default_product()

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use(product_router);
app.use(account_router);
app.use(wishlist_router);
app.use(order_router);
app.use(cart_router);

app.listen(port,()=>{
    console.log("Server listen");
})
