const UserServices = require("../services/user");
const { generatePayload } = require("../utils/generatePayload");

class UserController {
  static async getProfile(req, res, next) {
    const { email } = req.user;
    try {
      const { error, data } = await UserServices.findOneByEmail(email);
      if (error) {
        return res.status(404).send(data);
      }

      res.send(req.user);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  static async editProfile(req, res, next) {
    const { email } = req.user;
    try {
      const { error, data } = await UserServices.updateProfile(req.body, email);
      if (error) {
        return res.status(404).send(data);
      }
      const { token, payload } = generatePayload(data);
      res.cookie("token", token);
      res.status(201).send(payload);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async editPassword(req, res, next) {
    const { oldPassword, newPassword } = req.body;
    const { email } = req.user;
    try {
      const user = await UserServices.findOneByEmail(email);
      if (user.error) return res.status(404).send(user.data);
      const isValid = await user.data.validatePassword(oldPassword);
      if (!isValid) return res.status(401).send("Invalid credentials");
      const updatedUser = await UserServices.updatePassword(
        newPassword,
        user.data
      );
      if (updatedUser.error) return res.status(404).send(updatedUser.data);
      res.status(201).send("Password updated");
    } catch (error) {
      res.status(404).send(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const { error, data } = await UserServices.findOneByEmail(email);
      if (error) return res.status(404).send(data);
      if (!data) return res.status(401).send("Invalid credentials");
      const isValid = await data.validatePassword(password);
      if (!isValid) return res.status(401).send("Invalid credentials");
      const { token, payload } = generatePayload(data);
      res.cookie("token", token);
      res.send(payload);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  static async userMe(req, res, next) {
    res.send(req.user);
  }

  static async logoutUser(req, res, next) {
    res.clearCookie("token").status(204).send();
  }
}

module.exports = UserController;
