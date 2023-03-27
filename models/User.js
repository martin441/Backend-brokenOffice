const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
const { SALT, ALPHA, ALPHAT, BETA, BETAT, GAMA, GAMAT, OMEGA, OMEGAT } = process.env;
const bcrypt = require("bcrypt");

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
    required: true,
    enum: [ALPHAT, BETAT, GAMAT, OMEGAT],
    set: function(value) {
      if (value === ALPHAT) return ALPHA
      if (value === BETAT) return BETA
      if (value === GAMAT) return GAMA
      if (value === OMEGAT) return OMEGA
      throw new TypeError('Invalid credentials');
    }
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
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
  },
  reportHistory: {
    type: mongoose.ObjectId,
    ref: 'History' 
  }
});

user.methods.encryptPassword = function (password, salt) {
  return bcrypt.hash(password, salt);
}

user.methods.validatePassword = async function (password) {
  try {
    const hash = await this.encryptPassword(password, this.salt);
    return hash === this.password
  } catch (error) {
    console.error(error)
  }
}

user.pre("save", async function (next) {
  let userInstance = this;
  if (!userInstance.isModified('password')) return next();
  const salt = bcrypt.genSaltSync();
  userInstance.salt = salt;
  try {
    const hashPass = await userInstance.encryptPassword(userInstance.password, salt)
    userInstance.password = hashPass;
    return next();
  } catch (error) {
    return next(error)
  }
})

const User = mongoose.model("User", user);
module.exports = User;