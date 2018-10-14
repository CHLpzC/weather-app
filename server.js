require("./src/api/shared/config/config");

const express = require("express");
const path = require('path');

var app = express();
let http = require("http").createServer(app);
http.setTimeout(0);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');

    next();
});

// Imports
const city = require('./src/api/routes/city');
const weather = require('./src/api/routes/weather');

/**
 * Routes
 */
app.use('/city', city);
app.use('/weather', weather);

app.use(express.static(path.join(__dirname, 'dist/weather-app')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/weather-app/index.html'));
});

/** 
 * Starting NodeJS Process
 */
// http.listen(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
//     console.log(`API STARTED ON PORT: ${process.env.SERVER_PORT}`);
// });

http.listen(process.env.PORT || process.env.SERVER_PORT, () => {
    console.log(`API STARTED ON PORT: ${process.env.PORT}`);
});

// /**
//  * Starting Angular Process 
//  */
// const app_angular = express();

// app_angular.use(express.static(path.join(__dirname, 'dist/weather-app')));

// app_angular.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/weather-app/index.html'));
// });

// const server = require("http").createServer(app_angular);
// server.listen(process.env.APP_PORT, () => console.log(`APP STARTED ON PORT: ${process.env.APP_PORT}`));