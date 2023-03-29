const ReportsServices = require("../services/reports");
const UserServices = require("../services/user");
require("dotenv").config();
const { BETA } = process.env;

class ReportsController {
  static async allReports(req, res, next) {    
    try {
      const { error, data } = await ReportsServices.getAllReports();
      if (error) return res.status(404).send(data);
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async viewReports(req, res, next) {
    try {     
      const role = req.user.type === BETA ? "solver" : "issuer";
      const user = await UserServices.findOneByEmail(req.user.email);
      const { error, data } = await ReportsServices.getReports(
        user.data._id,
        role
      );
      if (error) return res.status(404).send(data);
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async createReport(req, res, next) {
    try {
      const user = await UserServices.findOneByEmail(req.user.email);
      const report = req.body;          
      const { error, data } = await ReportsServices.createNewReport(report, user.data._id);
      if (error) return res.status(404).send(data);
      res.status(201).send("User created successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async editReportState(req, res, next) {
    try {
      const { reportId } = req.params;
      const { status } = req.body;
      const { error, data } = await ReportsServices.editStateReport(
        reportId,
        status
      );
      if (error) return res.status(404).send(data);
      res.status(200).send("User updated successfully");
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
    try {
      const { reportId } = req.params;
      const { error, data } = await ReportsServices.deleteReport(reportId);
      if (error) return res.status(404).send(data);
      res.status(204).send();
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = ReportsController;
