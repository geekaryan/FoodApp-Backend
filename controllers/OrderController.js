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
    const order = await Placed.findById(req.params.id)
      .populate('customer_id') // Populate customer details
      .populate('order.items', 'name'); // Populate items with only the name field

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
    }

    // Convert populated menu items from objects to only names
    const updatedOrder = order.toObject(); // Convert Mongoose document to plain object
    updatedOrder.order = updatedOrder.order.map((ord) => ({
      ...ord,
      items: ord.items.map((item) => item.name), // Extract only names
    }));

    res.status(200).json({
      status: 'success',
      data: {
        order: updatedOrder,
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
    const { customer_id, order } = req.body;

    //check if customer_id already placed
    const existingOrder = await Placed.findOne({ customer_id });
    if (!existingOrder) {
      const neworder = await Placed.create({ customer_id, order });
      res.status(201).json({
        status: 'success',
        length: order.length,
        data: {
          order: neworder,
        },
      });
    } else {
      existingOrder.order.push(...order);

      //if we are adding into the exisiting one then we just have to direct push it and .save() is used to save
      await existingOrder.save();

      res.status(200).json({
        status: 'success',
        data: {
          order: existingOrder,
        },
      });
    }
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
