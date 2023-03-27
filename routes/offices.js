const express = require("express");
const OfficesController = require("../controllers/offices");
const router = express.Router();
const { validateUser } = require("../middleware/auth");

router.get("/", OfficesController.getOffices);
router.post("/add", OfficesController.addOffice);
router.delete("/delete/:officeId", OfficesController.deleteOffice);
router.put("/edit/:officeId", OfficesController.editOffice);

module.exports = router;
