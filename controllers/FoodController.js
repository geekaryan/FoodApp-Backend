const Order = require('./../modal/Foodmodal.js');
const {
  connectRedis,
  checkCache,
  setCache,
} = require('./../middlewares/CacheRedisMiddleware');

const intializeRedis = async () => {
  try {
    await connectRedis();
  } catch (err) {
    console.error(err);
  }
};

intializeRedis();

//get all orders
exports.getOrder = async (req, res) => {
  let isCached = false;
  let orders;
  try {
    const cacheResult = await checkCache('orders');
    if (cacheResult) {
      isCached = true;
      orders = cacheResult;
      console.log('I am here at the cache hit');
    } else {
      orders = await Order.find();
      if (orders.length === 0) {
        throw new Error('API is not returning any data');
      }

      //here storing data in the cache with key
      setCache('orders', orders);
    }
    res.status(200).json({
      status: 'success',
      fromCache: isCached,
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

//-----> Correct previous version without caching
// exports.getOrder = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json({
//       status: 'success',
//       length: orders.length,
//       data: {
//         orders,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

//get one particular order

exports.findbyOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
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

// create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json({
      status: 'success',
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

//update a order

exports.update = async (req, res) => {
  try {
    const orderUpdate = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        orderUpdate,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

//delete a tour
exports.delete = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id, req.body);
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
