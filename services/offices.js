const { User, Office } = require("../models");


class OfficesServices {
    static async getAll () {
        try {
            const allOffices = await Office.find({});
            return { error: false, data: allOffices };
        } catch (error) {
            return { error: true, data: error };
        }
    }
}

module.exports = OfficesServices;