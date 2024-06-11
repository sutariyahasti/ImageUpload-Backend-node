// const { Item1 } = require("../model/loginmodel");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user with the provided email exists in the database
//     const user = await Item1.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the provided password matches the user's password
//     if (password === user.password) {
//       // Passwords match, login successful
//       user.lastLogin = new Date(); // Update last login timestamp
//       await user.save();

//       return res.status(200).json({ message: "Login successful", user });
//     } else {
//       // Passwords don't match
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = { login };
