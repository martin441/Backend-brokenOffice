const express = require("express");
const router = express.Router();
const ResportsController = require("../controllers/reports");
const { validateOA, validateBeta, validateGama, validateOmega, validateOAB} = require("../middleware");

//Fetch all reports (superAdmin, Admin)
router.get("/", validateOA, ResportsController.allReports);

//Fetch service reports 
router.get("/service", validateBeta, ResportsController.viewReports);

//Fetch report history (standard) 
router.get("/history", validateGama, ResportsController.viewReports);

//Create new report (standard)
router.post("/create", validateGama, ResportsController.createReport);

//Edit report state (superAdmin, admin, service)
router.put("/edit/state/:reportId", validateOAB, ResportsController.editReportState);

//Edit report's office and solver (superAdmin, admin)
// router.put("/edit/destination", validateOA, ResportsController.editUReportDestination);

//Delete report (superAdmin, admin)
router.delete(
  "/delete/:reportId",
  validateOA,
  ResportsController.deleteReport
);

//Si como user me equivoco al armar mi reporte, lo puedo eliminar? lo puedo editar?

module.exports = router;