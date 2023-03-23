const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const officesRouter = require("./offices");

router.use("/user", userRouter);

router.use("/offices", officesRouter);



module.exports = router;
