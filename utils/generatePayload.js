const { generateToken } = require("./tokens");


function generatePayload (data) {
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
      return {token, payload};
}

module.exports = {generatePayload}