const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "itemName must be there"],
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemDescription: {
    type: String,
    required: [true, "itemDescription must be there"],
  },
  itemQuantity: {
    type: Number,
    required: [true, "itemQuantity must be there"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
