const mongoose = require("mongoose");

const usersModel = mongoose.model("users", {
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
    min: 11,
    max: 11,
  },
  email: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
    default: `user-${crypto.randomUUID()}`,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = usersModel;
