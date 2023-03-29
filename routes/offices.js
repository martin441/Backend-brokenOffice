const express = require("express");
const OfficesController = require("../controllers/offices");
const { validateAlpha} = require("../middleware");
const router = express.Router();


router.get("/", OfficesController.getOffices);
router.post("/add", validateAlpha, OfficesController.addOffice);
router.delete("/delete/:officeId", validateAlpha, OfficesController.deleteOffice);
router.put("/edit/:officeId", validateAlpha, OfficesController.editOffice);

module.exports = router;
