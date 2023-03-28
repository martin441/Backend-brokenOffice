const ReportsServices = require("../services/reports");

class ReportsController {
  static async allReports(req, res, next) {
    try {
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async createUeport(req, res, next) {
    try {
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async editReportState(req, res, next) {
    try {
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async editReportDestination(req, res, next) {
    try {
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async deleteReport(req, res, next) {
    const { userEmail } = req.params;
    try {
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = ReportsController;