const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            required: true
      },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    size: String,
    qty: Number
})

const Cart_model = mongoose.model("Cart", cartSchema)

module.exports = Cart_model
