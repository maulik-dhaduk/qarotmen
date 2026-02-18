const mongoose = require("mongoose")
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true
  },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
})

const Wishlist_model = mongoose.model("Wishlist",wishlistSchema)

module.exports = Wishlist_model