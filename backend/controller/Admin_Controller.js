const Product_model = require("../model/Product_Model");
const Account_model = require("../model/Account_Model");
const Order_model = require("../model/Order_Model");

const getAllUsers = async (req, res) => {
    try {
        const users = await Account_model.find({}).select("-password -otp -otpExpiration");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order_model.find({}).populate("userId", "firstname lastname email").sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product_model.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error adding product" });
    }
}

const editProduct = async (req, res) => {
    try {
        const product = await Product_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error editing product" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product_model.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
}

module.exports = { getAllUsers, getAllOrders, addProduct, editProduct, deleteProduct };

