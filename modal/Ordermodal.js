const mongoose = require('mongoose');

const placedSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, 'Must have a name'],
  // },
  // price: {
  //   type: Number,
  //   required: [true, 'Must have a price'],
  // },
  // customer_id: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  customer_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  items: [
    {
      item_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Menu',
      },
      item_quantity: {
        type: Number,
        required: [true, 'Minimum 1 items you must add'],
      },
      item_price: {
        type: Number,
        required: [true, 'Item price must be there'],
      },
    },
  ],
});

const Placed = mongoose.model('Placed', placedSchema);

module.exports = Placed;

//so my placed must contains the customer id then it must contain the array which take the food items are being ordered
//so i have to do this one thing firstly i check for the customer_id if it is already prsent then i will look into the
//items array and check if that item is already present then only increase the quantity else append item to the array list
