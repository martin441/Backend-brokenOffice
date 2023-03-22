const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ['standard', 'service', 'admin'],
      message: '{VALUE} is not supported'
    }
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
    lowercase: true,
    unique: true
  },
  address: {
    type: String
  },
  location: {
    type: String
  },
  picture: {
    type: String
  },
  office: {
    type: mongoose.ObjectId,
    ref: 'Office' 
  }
});

const User = mongoose.model("User", user);

module.exports = User;