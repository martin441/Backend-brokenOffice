const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const officesRouter = require("./offices");
const collaboratorsRouter = require("./collaborators");
const reportsRouter = require("./reports");
const { validateUser } = require("../middleware/auth");
const { Office } = require("../models");


router.use("/user", userRouter);
router.use("/offices", validateUser, officesRouter);
router.use("/collaborators", validateUser, collaboratorsRouter);
router.use("/reports", validateUser, reportsRouter);

module.exports = router;
