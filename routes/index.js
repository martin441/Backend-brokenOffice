const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const officesRouter = require("./offices");
const adminRouter = require("./admin");

router.use("/user", userRouter);
router.use("/offices", officesRouter);
router.use("/admin", adminRouter);



module.exports = router;
