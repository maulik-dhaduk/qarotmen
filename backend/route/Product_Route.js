const {show_product,Find_Prouct_data,search} = require("../controller/Product_Controller")
const express = require("express");

const product_router = express.Router();

product_router.get("/products", show_product);
product_router.get("/findproduct", Find_Prouct_data);
product_router.get("/search", search);

module.exports = product_router