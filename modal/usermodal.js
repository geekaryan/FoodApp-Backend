const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a username"],
  },
  email: {
    type: String,
    required: [true, "User must have a email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "User must have a password confirmation"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
