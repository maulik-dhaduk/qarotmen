const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name:String,
    sku:String,
    price:Number,
    category:String,
    images: [String],
    description: String
})

const Product_model = mongoose.model("Product",productSchema)

module.exports = Product_model