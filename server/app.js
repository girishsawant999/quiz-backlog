const express = require('express');
const http = require('http');
const dotenv = require("dotenv");
const session = require('express-session');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
const cors = require("cors");
const cron = require('node-cron');
const path = require('path');
const routes = require('./routes/index');
// setup mongo connection
require('./dbHelpers/connectDB.js');

// load env config
dotenv.config();

// Create Server
const app = express();
const server = http.createServer(app);

app.use(cors());
// check this code -- TO DO
app.use(session({
	secret: 'WSDMKDWK274YXMIWJRW83MMIQMNUR32MUEHEJ',
	resave: false,
	saveUninitialized: false,
})
);
app.use(express.json());

// Set API Routes
app.use('/api/v1', routes);


// Static Path to access files
const buildPath = path.join(__dirname, 'client', 'build')
app.use(express.static(buildPath))
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', "index.html"));
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8090;
// Start Server
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
