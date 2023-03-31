const ReportsServices = require("../services/reports");
const UserServices = require("../services/user");
const { sendEmail } = require("../utils/nodemailer");
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
      if (user.error) return res.status(404).send(user.data);
      const report = req.body;
      const service = await ReportsServices.selectService(report.office)
      if (service.error) return res.status(404).send(service.data);
      const { error, data } = await ReportsServices.createNewReport(
        report,
        user.data._id,
        service.data._id
      );
      if (error) return res.status(404).send(data);
      const reportPop = await data.populate(['issuer', 'solver', 'office'])
      sendEmail(reportPop, true)
      res.status(201).send("Report created successfully");
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
      res.status(200).send("Report updated successfully");
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

  static async closestOffices(req, res, next) {
    try {
      const lat = Number(req.query.lat);
      const long = Number(req.query.long);
      const userCoor = {
        type: "Point",
        coordinates: [long, lat],
      };
      const { error, data } = await ReportsServices.nearOffices(userCoor)
      if (error) return res.status(404).send(data);
      if (req.user.office._id) {
        const noFavorite = data.filter((office) => office._id.toString() !== req.user.office._id)
        const firstThree = noFavorite.slice(0, 3)
        return res.status(200).send(firstThree);
      }
      const firstThree = data.slice(0, 3)
      res.status(200).send(firstThree);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  static async shareReport(req, res, next) {
    try {
      const { reportId, emailTo } = req.body;
      const { error, data } = await ReportsServices.getOneReport(reportId);
      if (error) return res.status(404).send(data);
      sendEmail(data, false, emailTo)
      res.status(200).send();
    } catch (error) {
      res.status(404).send(error);
    }
  }

}

module.exports = ReportsController;
