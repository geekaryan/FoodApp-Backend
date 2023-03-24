const User = require('./../modal/usermodal');

exports.findAll = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
