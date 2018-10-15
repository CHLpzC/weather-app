import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Weather } from '../shared/models/weather';

@Injectable()
export class WeatherService {
    constructor(private http: Http) {
    }

    /**
     * Get forecast by city and unit of measurement
     * @param {*} city City
     * @param {*} units Unit of measurement
     */
    getWeather(city, units): Promise<Weather[]> {
        return this.http.get(`/weather/?city=${city}&days=15&units=${units}`).toPromise().then((response: any) => {
            return response.json() as Weather[];
        }).catch((error) => {
            return Promise.reject(JSON.parse(error._body).errorMessage);
        });
    }

    /**
     * Get forecast by city and unit of measurement and date(Free Plan: 1 day of data per API call)
     * @param {*} city City
     * @param {*} units Unit of measurement
     */
    getWeatherByDate(city, units, start_date, end_date): Promise<Weather[]> {
        return this.http.get(`/weather/byDate?city=${city}&start_date=${start_date}&end_date=${end_date}&units=${units}`).toPromise().then((response: any) => {
            return response.json() as Weather[];
        }).catch((error) => {
            return Promise.reject(JSON.parse(error._body).errorMessage);
        });
    }
}