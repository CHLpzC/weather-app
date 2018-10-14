import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Weather } from '../shared/models/weather';

@Injectable()
export class WeatherService {
    constructor(private http: Http) {
    }

    /**
     * Get forecast by position and units
     * @param {*} latitude Latitude of city
     * @param {*} longitude Longitude of city
     * @param {*} units Unit of measurement
     */
    getWeather(longitude, latitude, units): Promise<Weather[]> {
        return this.http.get(`/weather?latitude=${latitude}&longitude=${longitude}&days=15&units=${units}`).toPromise().then((response: any) => {
            return response.json() as Weather[];
        }).catch((error) => {
            return Promise.reject(JSON.parse(error._body).errorMessage);
        });
    }
}