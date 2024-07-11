const express = require('express');

const {
    register, login
} = require('../../controllers/authController');

module.exports = (config) => {
    const router = express.Router();

    router.post('/register', register);
    router.post('/login', login);

    return router;
};
