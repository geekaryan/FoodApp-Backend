const User = require('./../modal/usermodal');
const Placed = require('./../modal/Ordermodal');
const mongoose = require('mongoose');

exports.findAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters

    const orders = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) }, // Ensure `_id` is an ObjectId
      },
      {
        $lookup: {
          from: 'Placed', // Ensure this matches the collection name in your DB
          localField: '_id', // Match User `_id`
          foreignField: 'customer_id', // Match Placed `customer_id`
          as: 'orders', // The resulting array of orders
        },
      },
    ]);

    if (!orders.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with the provided ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: orders[0], // Return the first user with their orders
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
