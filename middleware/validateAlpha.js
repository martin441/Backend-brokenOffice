require("dotenv").config();
const { ALPHA } = process.env;

function validateAlpha(req, res, next) {
  const user = req.user;
  if (!user.type === ALPHA) return res.status(401).send("Invalid credentials");
  next();
}

module.exports = { validateAlpha };
