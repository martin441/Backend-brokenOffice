const CollaboratorsServices = require("../services/collaborators");

class CollaboratorsController {
  static async allUsers(req, res, next) {
    try {
      const { error, data } = await CollaboratorsServices.fetchAllUsers();
      if (error) return res.status(404).send(data);
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async createUser(req, res, next) {
    try {
      const userExists = await CollaboratorsServices.findUser(req.body.email);
      if (!userExists.error && userExists.data.length)
        return res.status(400).send("That user already exists");

      const { error, data } = await CollaboratorsServices.createNewUser(req.body);
      if (error) return res.status(404).send(data);
      res.status(201).send();
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async editUserType(req, res, next) {
    const { email, type } = req.body;
    try {
      const { error, data } = await CollaboratorsServices.editType(email, type);
      if (error) return res.status(404).send(data);
      res.send("Updated successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async deleteUser(req, res, next) {
    const { userEmail } = req.params;
    try {
      const { error, data } = await CollaboratorsServices.removeUser(userEmail);
      if (error) return res.status(404).send(data);
      res.send("Deleted successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = CollaboratorsController;
