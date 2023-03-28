const express = require("express");
const router = express.Router();
const ResportsController = require("../controllers/reports");
const { validateAlpha } = require("../middleware/validateAlpha");

//Fetch all reports (superAdmin, Admin)
// router.get("/", ResportsController.allReports);

//Fetch service reports 
// router.get("/service", ResportsController.allReports);

//Fetch report history (standard) 
// router.get("/history", ResportsController.allReports);

//Create new report (standard)--> Admins pueden crear?
// router.post("/create",  ResportsController.createReport);

//Edit report state (superAdmin, admin, service)
// router.put("/edit/state", ResportsController.editUReportState);

//Edit report's office and solver (superAdmin, admin, service)
// router.put("/edit/destination", ResportsController.editUReportDestination);

//Delete report (superAdmin, admin, service, standard)
// router.delete(
//   "/delete/:reportId",
//   validateAlpha,
//   ResportsController.deleteReport
// );

//Si como user me equivoco al armar mi reporte, lo puedo eliminar? lo puedo editar?

module.exports = router;