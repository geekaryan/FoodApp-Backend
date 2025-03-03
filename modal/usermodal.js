const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  passwordChangedAt: {
    type: Date,
  },
  name: {
    type: String,
    required: [true, 'User must have a username'],
  },
  email: {
    type: String,
    required: [true, 'User must have a email address'],
    unique: true, //every user must be unique
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User must have a password confirmation'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ['user', 'owner'], //enum is used to give restriction to the user that he only select from the given enum values
    default: 'user',
    required: true,
  },
});

//hashing our password using pre middleware --> used before saving the data and adding the data in the database.
userSchema.pre('save', async function (next) {
  //if password is not modified return to next..
  if (!this.isModified('password')) return next();

  //using bcrypt if the password is goona save
  this.password = await bcrypt.hash(this.password, 12);

  //not checking passwordConfirn because every hash is different
  this.passwordConfirm = undefined;
  next();
});

//adding passowrd change at timestamp functionality...
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Data.now() - 1000;
  next();
});

//Instnace methods.
//checking if the password that user has enterd is correct is not..
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //comparing here
  return await bcrypt.compare(candidatePassword, userPassword);
};

//changedpasswordafter middleware..
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  //when not changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
