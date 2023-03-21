const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prueba = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  imgURI: {
    type: String,
    default: "https://i.imgur.com/Z0869Hm.jpg",
  },
});

const Prueba = mongoose.model("Prueba", prueba);

module.exports = Prueba;