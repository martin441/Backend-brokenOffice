const { User, Report } = require("../models");

class ReportsServices {
  static async getAllReports() {
    try {
      const allReports = await Report.find({});
      return { error: false, data: allReports };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getReports(userId, role) {
    try {      
      const allServiceReports = await Report.find({ [role]: userId });    
      return { error: false, data: allServiceReports };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async createNewReport(report) {
    try {
      const newReport = await Report.create(report);
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
