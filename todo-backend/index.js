const db = require('./config/db');
const config = require('./config/config');
const express = require('express');
const app = express();
const routeHandler = require('./src/routes/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
    const allowedOrigins = [
        'http://localhost:3000',
	'https://todo-app-nine-brown.vercel.app/',
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-token'); // Include 'x-token' header
    next();
});

app.use('/api', routeHandler(config));

app.all('*', (req, res) => {
    res.status(404).send({
        error: 'resource not found',
    });
});

async function startServer() {
    await db.connect();
}

const server = app.listen(config.port, () => {
    startServer().catch(console.error);
    console.log(`Server running at http://${config.hostname}:${server.address().port}/`);
});
