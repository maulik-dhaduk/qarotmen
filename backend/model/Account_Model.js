const mongoose = require("mongoose")
const accountSchema = new mongoose.Schema({
    email:{type: String,unique: true},
    password:String,
    firstname:String,
    lastname:String,
    role: String,
    otp: String,
    otpExpiration: Date
})

const Account_model = mongoose.model("account",accountSchema)

module.exports = Account_model
