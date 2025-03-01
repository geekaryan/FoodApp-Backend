const mongoose = require('mongoose');

const menuModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A item must have a name'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'An item must have a tast description'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'A rating must be above 1.0'],
    max: [5, 'A rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10, //this is used to round off values
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [],
  },
  price: {
    type: Number,
    required: [true, 'Price of food item must be mentioned'],
  },
});

const Menu = mongoose.model('Menu', menuModel);

module.exports = Menu;
