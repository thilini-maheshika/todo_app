const db = require('./config/db');
const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const app = express();
const routeHandler = require('./src/routes/index');

// Setup CORS
const allowedOrigins = [
    'http://localhost:3000',
    'https://todo-frontend-orpin.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow non-web browser clients
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization,x-token',
    credentials: true // Allow cookies and authorization headers
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
