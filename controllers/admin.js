const AdminServices = require("../services/admin");

class UserController {
  static async allUsers(req, res, next) {
    try {
      const { error, data } = await AdminServices.fetchAllUsers();
      if (error) return res.status(404).send(data);     
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async createUser(req, res, next) {
    try {
      const userExists = await AdminServices.findUser(req.body.email);
      if (!userExists.error && userExists.data.length)
        return res.status(400).send("That user already exists");

      const { error, data } = await AdminServices.createNewUser(req.body);
      if (error) return res.status(404).send(data);
      res.status(201).send();
    } catch (error) {
      res.status(404).send(error);
    }
  }  
  static async editUserType(req, res, next) {
    const {email, type} = req.body;
    console.log(email, type)
    try {
      const { error, data }  = await AdminServices.editType(email, type);      
      if (error) return res.status(404).send(data);
      res.send("Updated successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  }
  static async deleteUser(req, res, next) {
    const {email} = req.body;
    try {
      const { error, data }  = await AdminServices.removeUser(email); 
        console.log(data)
      if (error) return res.status(404).send(data);
      res.send("Deleted successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = UserController;
