const mongoose = require("mongoose");

const menuModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A item must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "An item must have a tast description"],
  },
  ratings: {
    type: Number,
    required: [true, "Ratings of food items must be there"],
  },
  tags: {
    type: [],
  },
});

const Menu = mongoose.model("Menu", menuModel);

module.exports = Menu;
