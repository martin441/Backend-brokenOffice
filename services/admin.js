const { User } = require("../models");

class AdminServices {
  static async fetchAllUsers() {
    try {
      const users = await User.find({});
      return { error: false, data: users };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async findUser(email) {
    try {
      const userExists = await User.find({ email });
      return { error: false, data: userExists };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async createNewUser(info) {
    try {
      const newUser = await User.create(info);
      return { error: false, data: newUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async editType(email, type) {    
    try {      
      const privilegesUpdated = await User.findOneAndUpdate({ email }, {type})
      return { error: false, data: privilegesUpdated };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async removeUser(email) {        
    try {      
      const removedUser = await User.deleteOne({ email });
      return { error: false, data: removedUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = AdminServices;
