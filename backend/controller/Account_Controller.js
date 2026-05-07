const Account_model = require("../model/Account_Model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "dhadukmaulik2002@gmail.com",
    pass: "kftzofgpqcfxmjsa"
  }
});
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

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const account = await Account_model.findOne({ email });
    if (!account) return res.status(400).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 1 * 60 * 1000);

    account.otp = otp;
    account.otpExpiration = otpExpiration;
    await account.save();

    const mailOptions = {
      from: "dhadukmaulik2002@gmail.com",
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It is valid for 1 minute.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send OTP", error: error.message });
      }
      setTimeout(async () => {
        const user = await Account_model.findById(account._id);
        if (user && user.otp === otp) {
          user.otp = undefined;
          user.otpExpiration = undefined;
          await user.save();
        }
      }, 60000);
      res.json({ message: "OTP sent successfully" });
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to process request", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const account = await Account_model.findOne({ email });
    if (!account) return res.status(400).json({ message: "Email not found" });

    if (account.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    
    if (account.otpExpiration < new Date()) {
      account.otp = undefined;
      account.otpExpiration = undefined;
      await account.save();
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const account = await Account_model.findOne({ email });
    if (!account) return res.status(400).json({ message: "Email not found" });

    if (account.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (account.otpExpiration < new Date()) {
      account.otp = undefined;
      account.otpExpiration = undefined;
      await account.save();
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    account.password = hashedPassword;
    account.otp = undefined;
    account.otpExpiration = undefined;
    await account.save();

    res.json({ message: "Password reset successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};

module.exports = { register, login, profile, sendOtp, verifyOtp, resetPassword }
