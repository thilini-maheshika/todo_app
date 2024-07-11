const jwt = require("jsonwebtoken");

function getToken(email, time) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: time });
}

module.exports = { getToken };
