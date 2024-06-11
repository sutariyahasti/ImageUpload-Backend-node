const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const Routes = require("./routes/userRoutes");

const uri = "mongodb://127.0.0.1:27017/my-datas"
// mongoose
//   .connect("mongodb://localhost:27017/my-datas" || "mongodb://127.0.0.1:27017/my-datas", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
    // Now you can start using your Mongoose models and perform operations on the database
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
app.use(cors());

app.use("/uploads", express.static(path.join("uploads")));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", Routes);

// //==========================================================================

// const multer = require("multer");

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Destination folder where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Rename files to prevent name conflicts
//   },
// });

// const upload = multer({ storage: storage });

// // MongoDB Schema
// const ItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   imageUrl: String, // Add this field to store the image path or URL
// });
// const Item = mongoose.model("Item", ItemSchema);
// module.exports = { Item };

// // Body Parser Middleware
// app.use(bodyParser.json());
// // app.use("/", userRoutes);

// // POST route to add an item
// app.post("/api/items", upload.single("image"), async (req, res) => {
//   try {
//     const { name, email, password, phone, address } = req.body;

//     // File data is available in req.file if an image was uploaded
//     const { filename, path } = req.file;

//     // Create a new item instance with image data
//     const newItem = new Item({
//       name,
//       email,
//       password,
//       phone,
//       address,
//       imageUrl: path, // Store the path or URL to the uploaded image in the database
//     });

//     // Save the item to the database
//     await newItem.save();

//     res.status(201).json({ message: "Item added successfully", item: newItem });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.find(); // Fetch all items from the database

//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user with the provided email exists in the database
//     const user = await Item.findOne({ email });

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
// });
// // =============================================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
