const otpGenerator = require("otp-generator");
const OTP = require("../model/optSchemma");
const Userotp = require("../model/optSchemma");
const Userdata = require("../model/userdata");
const { Item1 } = require("../model/loginmodel");

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const { filename, path } = req.file;

    console.log(req.body, res.file);
    // Check if user is already present
    const checkUserPresent = await Item1.findOne({ email });
    // If user found with provided email
    // if (checkUserPresent) {
    //   console.log("user exist");
    //   return res.status(401).json({
    //     success: false,
    //     message: "User is already registered",
    //   });
    // }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp, path };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
      otpBody,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendOTP };
