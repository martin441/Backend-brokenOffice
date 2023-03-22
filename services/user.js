const { User, Office } = require("../models");

class UserServices {
  static async findOne(name) {
    try {
      const singleUser = await User.findOne({ name }).populate("office");
      return { error: false, data: singleUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = UserServices;
