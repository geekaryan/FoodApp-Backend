const Placed = require('./../modal/Ordermodal');
exports.findAll = async (req, res, next) => {
  try {
    const orders = await Placed.find();
    res.status(200).json({
      status: 'success',
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