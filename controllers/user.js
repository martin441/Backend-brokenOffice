const { generateToken } = require("../config/tokens");
const UserServices = require("../services/user");

class UserController {
  static async getProfile(req, res, next) {
    const {email} = req.user;
    try {
      const { error, data } = await UserServices.findOneByEmail(
        email
      );
      if (error) {
        return res.status(404).send(data);
      }

      res.send(req.user);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  static async editProfile(req, res, next) {
    const {email} = req.user;
    try {
      const { error, data } = await UserServices.updateProfile(
        req.body,
        email
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
    const { oldPassword, newPassword } = req.body;
    const {email} = req.user;
    // antes un checkeo con la contraseña vieja!
    try {
      const { error, data } = await UserServices.updatePassword(
        newPassword,
        email
      );
      if (error) {
        return res.status(404).send(data);
      }
      res.send(data);
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
      const payload = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        type: data.type,
        role: data.role,
        address: data.address || "",
        location: data.location || "",
        picture: data.picture || "",
        office: data.office || "",
        reportHistory: data.reportHistory || ""
      };
      const token = generateToken(payload);
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
    res.clearCookie("token").status(204).send()
  }
}

module.exports = UserController;
