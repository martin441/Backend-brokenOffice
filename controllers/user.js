const UserServices = require("../services/user");

class UserController {
  static async getProfile(req, res, next) {
    // email hardcodeado! usaríamos la cookie para obtener el payload
    try {
      const { error, data } = await UserServices.findOneByEmail(
        "admin@mail.com"
      );
      if (error) {
        return res.status(404).send(data);
      }
      res.send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  static async editProfile(req, res, next) {
    // email hardcodeado! usaríamos la cookie para obtener el payload
    // req.body with the exact properties to change!
    try {
      const { error, data } = await UserServices.updateProfile(
        req.body,
        "admin@globant.com"
      );
      if (error) {
        return res.status(404).send(data);
      }
      res.send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async editPassword(req, res, next) {
    // email hardcodeado! usaríamos la cookie para obtener el payload
    const { password } = req.body;
    try {
      const { error, data } = await UserServices.updatePassword(
        password,
        "admin@globant.com"
      );
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
