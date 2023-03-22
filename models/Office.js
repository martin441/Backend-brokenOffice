const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const office = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
});

const Office = mongoose.model("Office", office);

module.exports = Office;