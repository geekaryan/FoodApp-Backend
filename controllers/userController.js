const User = require('./../modal/usermodal');
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
    const userId = req.params.id;
    const orders = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'placeds',
          localField: '_id',
          foreignField: 'customer_id',
          as: 'orders',
        },
      },
    ]);
    if (!orders.length) {
      res.status(404).json({
        status: 'fail',
        message: 'No user found with the provided id',
      });
    }
    res.status(200).json({
      status: 'success',
      data: orders[0],
    });

    // const user = await User.findById(req.params.id).populate('customer_id');
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     user,
    //   },
    // });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
