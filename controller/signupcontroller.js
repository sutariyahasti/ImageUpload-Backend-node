const { Item1 } = require("../model/loginmodel");

const signup = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // File data is available in req.file if an image was uploaded
    const { filename, path } = req.file;
    // Create a new item instance with image data
    const newItem = new Item1({
      name,
      email,
      password,
      phone,
      address,
      image: path, // Store the path or URL to the uploaded image in the database
    });

    // Save the item to the database
    await newItem.save();

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup };
