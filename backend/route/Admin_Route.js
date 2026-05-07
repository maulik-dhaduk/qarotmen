const express = require("express");
const admin_router = express.Router();
const auth = require("../middleware/auth");
const { isAdmin } = auth;
const { getAllUsers, getAllOrders, addProduct, editProduct, deleteProduct } = require("../controller/Admin_Controller");

admin_router.get("/admin/users", auth, isAdmin, getAllUsers);
admin_router.get("/admin/orders", auth, isAdmin, getAllOrders);
admin_router.post("/admin/product", auth, isAdmin, addProduct);
admin_router.put("/admin/product/:id", auth, isAdmin, editProduct);
admin_router.delete("/admin/product/:id", auth, isAdmin, deleteProduct);

module.exports = admin_router;

