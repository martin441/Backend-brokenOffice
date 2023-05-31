const { validateToken } = require("../utils/tokens");

function validateUser(req, res, next) {
  const token = req.cookies.token; //la forma de express para obtener el header
  console.log("token del logout del back", token);
  if (!token) return res.status(401).send("Invalid credentials");
  const { payload } = validateToken(token);
  if (!payload) return res.status(401).send("Invalid credentials");
  req.user = payload;
  next();
}

module.exports = { validateUser };
