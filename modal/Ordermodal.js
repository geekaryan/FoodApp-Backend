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
  order: [
    {
      items: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Menu',
        },
      ],
      quantity: [
        { type: Number, required: [true, 'There must a quantity of the item'] },
      ],
      price: [
        {
          type: Number,
          required: [true, 'There must be a price of a particular item'],
        },
      ],
    },
  ],
});

const Placed = mongoose.model('Placed', placedSchema);

module.exports = Placed;

//so my placed must contains the customer id then it must contain the array which take the food items are being ordered
//so i have to do this one thing firstly i check for the customer_id if it is already prsent then i will look into the
//items array and check if that item is already present then only increase the quantity else append item to the array list
//I haven't done anything today 23-1-25

//I haven't done anything for past 6 days but not it's time to change

//this is my current thinking as of 29-1-25
// data need to be in my server
// => /order route
// -> customer_id
// -> items_id
// -> quantity
// -> price

// there is goin to be 3 array and primary key is goin to be customer_id

// items_id, quantity, price
// each index of items_id is going to represent,

//the api has been successfully been made here
