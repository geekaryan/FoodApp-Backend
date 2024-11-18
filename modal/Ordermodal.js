const mongoose = require('mongoose');

const placedSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  customer_id: {
    type: String,
  },
});

const Placed = mongoose.model('Placed', placedSchema);

module.exports = Placed;
