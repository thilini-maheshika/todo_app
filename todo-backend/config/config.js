require("dotenv").config();

//get all config from .env and export
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  mongouri: process.env.MONGODB_URI,
  options: {
    encrypt: true,
  },
};
