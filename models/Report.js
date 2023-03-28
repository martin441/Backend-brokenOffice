const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pointSchema = require("./pointSchema");

const report = new Schema({
  issuer: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
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
    enum: ["issued", "assigned", "in progress", "closed"],
    default: "issued",
  },
  messages: {
    type: Array,
  },
});

const Report = mongoose.model("Report", report);

module.exports = Report;

/* 
    const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);
*/