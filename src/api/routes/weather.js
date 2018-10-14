const express = require("express");
const router = express.Router();
const WeatherModule = require("../modules/weather");

/**
 * Get Weather information with position and unit parameters
 */
router.get("/", (req, res) => {
    let objWeatherModule = new WeatherModule();
    objWeatherModule.get_forecast(req.query.latitude, req.query.longitude, req.query.days, req.query.units).then((temperature) => {
        return res.status(200).send(temperature);
    }).catch((error) => {
        return res.status(400).send(error);
    })
});

module.exports = router;
