const express = require('express')
const todoRoute = require('./todo/todo');
const userRoute = require('./user/user');

module.exports = (config) => {
    const router = express.Router();
    router.use('/user', userRoute(config));
    router.use('/todo', todoRoute);

    return router;
};

