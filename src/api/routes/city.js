const express = require("express");
const router = express.Router();
const CityModule = require("../modules/city");
/**
 * Get cities of Sonora México
 */
router.get("/", (req, res) => {
    let objCityModule = new CityModule();
    objCityModule.getCities().then((cities) => {
        return res.status(200).send(cities);
    }).catch((error) => {
        return res.status(400).send(error);
    })
});

module.exports = router;
