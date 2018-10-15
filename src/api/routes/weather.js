const express = require("express");
const router = express.Router();
const WeatherModule = require("../modules/weather");

/**
 * Get Weather information with position and unit parameters
 */
router.get("/?", (req, res) => {
    let objWeatherModule = new WeatherModule();
    objWeatherModule.get_forecast(req.query.city, req.query.days, req.query.units).then((temperature) => {
        return res.status(200).send(temperature);
    }).catch((error) => {
        return res.status(400).send(error);
    })
}); 

router.get("/byDate?", (req, res) => {
    let objWeatherModule = new WeatherModule();
        objWeatherModule.get_temperature_by_date_and_city(req.query.city, req.query.start_date, req.query.end_date, req.query.units).then((temperature) => {
        return res.status(200).send(temperature);
    }).catch((error) => {
        return res.status(400).send(error);
    })
}); 

module.exports = router;
