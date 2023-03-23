const OfficesServices = require("../services/offices");

class OfficesController {
  static async getOffices(req, res, next) {
    try {
      const { error, data } = await OfficesServices.getAll();
      if (error) {
        return res.status(404).send(data);
      }
      res.send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = OfficesController;
