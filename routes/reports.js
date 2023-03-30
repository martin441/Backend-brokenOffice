const express = require("express");
const router = express.Router();
const ResportsController = require("../controllers/reports");
const { validateOA, validateBeta, validateGama, validateOmega, validateOAB} = require("../middleware");

router.get("/", validateOA, ResportsController.allReports);

router.get("/service", validateBeta, ResportsController.viewReports);

router.get("/history", validateGama, ResportsController.viewReports);

router.post("/create", validateGama, ResportsController.createReport);

router.put("/edit/state/:reportId", validateOAB, ResportsController.editReportState);

//Edit report's office and solver (superAdmin, admin)
// router.put("/edit/destination", validateOA, ResportsController.editUReportDestination);

router.delete(
  "/delete/:reportId",
  validateOA,
  ResportsController.deleteReport
);

router.get("/geoffice", validateGama, ResportsController.closestOffices);

module.exports = router;