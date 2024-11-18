const mongoose = require('mongoose');

const placedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'Must have a price'],
  },
  customer_id: {
    type: String,
    required: [true, 'A user must be there who ordered'],
  },
});

const Placed = mongoose.model('Placed', placedSchema);

module.exports = Placed;
