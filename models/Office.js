const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const office = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    floor: {
      type: String
    }
  },
  coordinates: {
    type: String,
    required: true,
  },
});

const Office = mongoose.model("Office", office);

module.exports = Office;