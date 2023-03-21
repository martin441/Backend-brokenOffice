const express = require("express");
const app = express();
const { db_sync } = require("./config/db");
const models = require('./models')
// const router = require("./routes/index");
// const cors = require("cors");
const volleyball = require('volleyball');
require("dotenv").config();
const { PORT } = process.env;
const cookiesParser = require("cookie-parser");

app.use(cookiesParser());

app.use(volleyball);


/* app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); */

app.use(express.json());

// app.use("/", router);

db_sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server ON PORT: 3001`));

  })
  .catch((err) => {
    console.error(err);
  });
