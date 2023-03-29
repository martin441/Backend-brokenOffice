const { User, Report, Office} = require("../models");

class ReportsServices {
  static async getAllReports() {
    try {
      const allReports = await Report.find({})
        .populate("issuer")
        .populate("solver");
      return { error: false, data: allReports };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getReports(userId, role) {
    try {
      const allServiceReports = await Report.find({ [role]: userId })
        .populate("issuer")
        .populate("solver");
      return { error: false, data: allServiceReports };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async createNewReport(report, id) {
    try {
      const newReport = await Report.create(report);
      newReport.issuer = id;
      newReport.save();
      const office = await Office.findById(newReport.office)
      office.openReports += 1
      office.save();
      return { error: false, data: newReport };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async editStateReport(reportId, status) {
    try {
      const reportStateUpdated = await Report.findByIdAndUpdate(
        reportId,
        { status },
        {
          runValidators: true,
          new: true,
        }
      );
      if (status === "closed"){
        const office = await Office.findById(reportStateUpdated.office)
        office.openReports -= 1
        office.save();
      }
      return { error: false, data: reportStateUpdated };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async deleteReport(reportId) {
    try {
      const deletedReport = await Report.findByIdAndRemove(reportId);
      return { error: false, data: deletedReport };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ReportsServices;
