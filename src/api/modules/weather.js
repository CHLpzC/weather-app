var request = require("request-promise");

module.exports = class WeatherModule {
    /**
     * Get forecast by position and units
     * @param {*} latitude Latitude of city
     * @param {*} longitude Longitude of city
     * @param {*} days Days quantity 
     * @param {*} units Unit of measurement
     */
    get_forecast(latitude, longitude, days, units) {
        return request.get(`${process.env.WEATHER_API}&days=${days}&lat=${latitude}&lon=${longitude}&units=${units}`,
            { json: true }).then((forecast) => {
                if (forecast == null) {
                    return { errorMessage: "Couldn't find info" };
                }
                /**
                 * Returning the necessary properties
                 */
                return forecast.data.map(obj => {
                    return {
                        datetime: obj.datetime,
                        max_temp: obj.max_temp,
                        min_temp: obj.min_temp
                    }
                });
            }).catch((error) => {
                if (error.errorMessage == null) {
                    error = { errorMessage: "Couldn't get forecast" };
                }
                return Promise.reject(error);
            });
    }
} 