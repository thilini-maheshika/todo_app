const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const userAuth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
  } catch (error) {
      res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = userAuth;
