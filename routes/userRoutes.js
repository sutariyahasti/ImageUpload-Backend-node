// const signup = requ;
const express = require("express");
const router = express.Router();
const { getdata, loginUser } = require("../controller/datacontroller");
const upload = require("../multerConfig");
const { signup } = require("../controller/signupcontroller");
const { sendOTP } = require("../controller/otpControllers");
const { signupuser } = require("../controller/authController");
// const { login } = require("../controller/logincontroller");

router.get("/items", getdata);
router.post("/login", loginUser);
router.post("/items", upload.single("image"), signup);
// router.delete("/:id", delet);
// router.put("/:id", update);
router.post("/send-otp", upload.single("image"), sendOTP);
router.post("/signup", upload.single("image"), signupuser);

module.exports = router;
