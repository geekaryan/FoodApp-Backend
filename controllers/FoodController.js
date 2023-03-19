const Order = require("./../modal/Foodmodal.js");

//get all orders
exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      length: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//get one particular order

exports.findbyOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      status: "success",
      length: order.length,
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//update a order

exports.update = async (req, res) => {
  try {
    const orderupdate = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//delete a tour
exports.delet = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
