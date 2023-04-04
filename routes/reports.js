const express = require("express");
const router = express.Router();
const ResportsController = require("../controllers/reports");
const {
  validateOA,
  validateBeta,
  validateOAB,
} = require("../middleware");

router.get("/", validateOA, ResportsController.allReports);

router.get("/single/:reportId", ResportsController.oneReport);

router.get("/service", validateBeta, ResportsController.viewReports);

router.get("/history", ResportsController.viewReports);

router.post("/create", ResportsController.createReport);

router.post("/create/img", ResportsController.createReportImg);

router.put(
  "/edit/state/:reportId",
  validateOAB,
  ResportsController.editReportState
);

//Edit report's office and solver (superAdmin, admin)
// router.put("/edit/destination", validateOA, ResportsController.editUReportDestination);

router.delete("/delete/:reportId", validateOA, ResportsController.deleteReport);

router.get("/geoffice", ResportsController.closestOffices);

router.post("/share", ResportsController.shareReport);

module.exports = router;
