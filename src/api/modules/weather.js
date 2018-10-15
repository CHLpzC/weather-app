var request = require("request-promise");

module.exports = class WeatherModule {

    transform_data(data) {
        return data.map(obj => {
            return {
                datetime: obj.datetime,
                max_temp: obj.max_temp,
                min_temp: obj.min_temp
            }
        });
    }
    /**
     * Get temperature by city and date
     * @param {*} city City name
     * @param {*} start_date
     */
    get_temperature_by_date_and_city(city, start_date, end_date, units) {
        return request.get(`${process.env.WEATHER_DAY}&start_date=${start_date}&end_Date=${end_date}&city=${city.replace(" ", "")}&units=${units}`,
            { json: true }).then((forecast) => {
                if (forecast == null || Object.keys(forecast.data).length == 0) {
                    return { errorMessage: "Couldn't find info" };
                }
                /**
                 * Returning the necessary properties
                 */
                return this.transform_data(forecast.data);
            }).catch((error) => {
                console.log(error);
                if (error.errorMessage == null) {
                    error = { errorMessage: "Couldn't get forecast" };
                }
                return Promise.reject(error);
            });
    }

    /**
     * Get forecast by position and units
     * @param {*} city Latitude of city
     * @param {*} days Days quantity 
     * @param {*} units Unit of measurement
     */
    get_forecast(city, days, units) {
        return request.get(`${process.env.WEATHER_API}&days=${days}&city=${city.replace(" ", "")}&units=${units}`, {
            json: true
        }).then((forecast) => {
            if (forecast == null) {
                return { errorMessage: "Couldn't find info" };
            }

            /**
             * Returning the necessary properties
             */
            return this.transform_data(forecast.data);
        }).catch((error) => {

            console.log(error);
            if (error.errorMessage == null) {
                error = { errorMessage: "Couldn't get forecast" };
            }
            return Promise.reject(error);
        });
    }
} 