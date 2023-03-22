
const UserServices = require("../services/user");

class UserController {
  static async getProfile(req, res, next) {
    
    try {
      const {error, data} = await UserServices.findOne("Pepe");
      if (error) {
        return res.status(404).send(data);
      }
      res.send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = UserController;
