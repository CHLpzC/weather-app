var request = require("request-promise");

module.exports = class CityModule {

    /**
     * Get position of Cities of Sonora México
     */
    getCities() {
        return request.get(process.env.CITIES_API, { json: true }).then((auxCities) => {

            /**
             * Returning the neccesary properties
             */
            let cities = [];
            auxCities.forEach(city => {
                let objCity = {
                    longitude: city.lng,
                    latitude: city.lat,
                    city: city.nombre_municipio
                }

                if (city.clave_municipio != 0) {
                    cities.push(objCity);
                }

                if (objCity.city == "Cajeme") {
                    objCity.city = "Cd. Obregón";
                }
            });

            return cities;
        }).catch((error) => {
            return Promise.reject({ errorMessage: "Couldn't get the cities" });
        });
    }
}