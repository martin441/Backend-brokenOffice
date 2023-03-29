const express = require("express");
const OfficesController = require("../controllers/offices");
const { validateOA } = require("../middleware");
const router = express.Router();

router.get("/", OfficesController.getOffices);
router.post("/add", validateOA, OfficesController.addOffice);
router.delete("/delete/:officeId", validateOA, OfficesController.deleteOffice);
router.put("/edit/:officeId", validateOA, OfficesController.editOffice);

module.exports = router;
