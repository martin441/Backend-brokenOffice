const express = require("express");
const OfficesController = require("../controllers/offices");
const router = express.Router();
const { validateUser } = require("../middleware/auth");

router.get("/", validateUser, OfficesController.getOffices)

module.exports = router;