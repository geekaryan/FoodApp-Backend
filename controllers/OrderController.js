const Placed = require('./../modal/Ordermodal');
exports.findAll = async (req, res, next) => {
  try {
    const orders = await Placed.find();
    res.status(200).json({
      status: 'success',
      length: orders.length,
      data: {
        orders,
      },
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
    const order = await Placed.findById(req.params.id).populate('customer_id');
    res.status(200).json({
      status: 'success',
      length: order.length,
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Placed.create(req.body);
    res.status(200).json({
      status: 'success',
      length: order.length,
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Placed.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
