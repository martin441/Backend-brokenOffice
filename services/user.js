const { User, Office } = require("../models");

class UserServices {
  static async findOneByEmail(email) {
    try {
      const singleUser = await User.findOne({ email }).populate("office");
      return { error: false, data: singleUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async updateProfile(obj, email) {
    try {
      const userUpdated = await User.findOneAndUpdate({ email }, obj, {
        runValidators: true,
        new: true,
      }).populate("office");
      return { error: false, data: userUpdated };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async updatePassword(password, user) {
    try {
      user.password = password;
      await user.save();
      return { error: false, data: user };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = UserServices;
