const OTP = require("../model/optSchemma");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { Item1 } = require("../model/loginmodel");

const signupuser = async (req, res) => {
  try {
    const { address,email,name,otp,password,phone, } = req.body;
    const { path } = req.file;

    // Check if all details are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await Item1.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(401).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const newUser = await Item1.create({
      address,
      email,
      name,
      password,
      phone,
      image: path,
      lastLogInDate: new Date()
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { signupuser };
