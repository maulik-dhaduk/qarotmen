const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  shippingDetails: {
    firstname: String,
    lastname: String,
    mobile: String,
    address: String,
    postalcode: String,
    state: String,
    city: String
  },
  paymentMethod: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      qty: Number,
      size: String,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  }
});

const Order_model = mongoose.model("Order", orderSchema);
module.exports = Order_model;
