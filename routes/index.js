const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const officesRouter = require("./offices");
const collaboratorsRouter = require("./collaborators");
const { validateUser } = require("../middleware/auth");

router.use("/user", userRouter);
router.use("/offices", validateUser, officesRouter);
router.use("/collaborators", validateUser, collaboratorsRouter);



module.exports = router;
