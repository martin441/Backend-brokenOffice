const express = require("express");
const router = express.Router();
const ResportsController = require("../controllers/reports");
const { validateAlpha, validateBeta, validateGama, validateOmega} = require("../middleware");

//Fetch all reports (superAdmin, Admin)
router.get("/", validateAlpha, ResportsController.allReports);

//Fetch service reports 
router.get("/service", validateBeta, ResportsController.viewReports);

//Fetch report history (standard) 
router.get("/history", validateGama, ResportsController.viewReports);

//Create new report (standard)--> Admins pueden crear?
router.post("/create", validateGama,  ResportsController.createReport);

//Edit report state (superAdmin, admin, service)
router.put("/edit/state/:reportId", ResportsController.editReportState);

//Edit report's office and solver (superAdmin, admin, service)
// router.put("/edit/destination", ResportsController.editUReportDestination);

//Delete report (superAdmin, admin, service, standard)
router.delete(
  "/delete/:reportId",
  validateAlpha,
  ResportsController.deleteReport
);

//Si como user me equivoco al armar mi reporte, lo puedo eliminar? lo puedo editar?

module.exports = router;