const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = new Schema({
  issuer: {
    type: mongoose.ObjectId,
    ref: "User",    
  },
  solver: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  office: {
    type: mongoose.ObjectId,
    ref: "Office",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["issued", "in progress", "closed"],
    default: "issued",
  },
  messages: {
    type: Array,
  },
  product: {
    type: String,
    enum: ["modem", "hdmi", "monitor", "mobile", "notebook", "headset", "mouse", "chair", "keyboard", "notebook charger", "mobile charger", "port adapter"],
    required: true,
  },
});

const Report = mongoose.model("Report", report);

module.exports = Report;
