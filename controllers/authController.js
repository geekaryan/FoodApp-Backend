const jwt = require('jsonwebtoken');
const User = require('./../modal/usermodal');

//sending token while singup

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.singUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });
    const token = signToken(newUser._id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //check if email and password exist..
    if (!email || !password) {
      res.status(401).json({
        status: 'fail',
        message: 'Please provide email and password',
      });
    }

    //check if user exist and password is correct..

    const user = await User.findOne({ email }).select('+password');
    console.log(user);

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    //if everything is fine send the jwt token..
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
