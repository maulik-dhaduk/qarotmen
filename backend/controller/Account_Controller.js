const Account_model = require("../model/Account_Model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname, role } = req.body
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await Account_model.findOne({ email });

    if (user) {
      return res.status(409).json({ exists: true, message: 'Email already registered' });
    }

    const account = await Account_model.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role
    })

    return res.json(account)

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create the record",
      error: error.message
    })
  }
}

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const account = await Account_model.findOne({ email });
    if (!account) return res.status(400).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });


    let payload = {
      id: account._id,
      email: account.email,
      firstname: account.firstname,
      lastname: account.lastname,
      role: account.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({
      message: "Login successfully",
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
      error: error.message
    })
  }
}

const profile = (req, res) => {
  res.json(req.user)
}
module.exports = { register, login, profile }