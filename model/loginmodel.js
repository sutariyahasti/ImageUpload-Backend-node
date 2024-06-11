const mongoose = require("mongoose");

const ItemSchema1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: String,
  lastLogInDate: { type: Date, default: null },
});
const Item1 = mongoose.model("Items", ItemSchema1);
module.exports = { Item1 };
