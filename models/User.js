const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const User = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide name"],
  },
  email: {
    type: String,
    require: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  passoword: {
    type: String,
    require: [true, "Please provide password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
