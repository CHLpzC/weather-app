import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { City } from '../shared/models/city';


@Injectable()
export class CityService {
    constructor(private http: Http) {
    }

    /**
     * Get cities of Sonora México
     */
    getCities(): Promise<City[]> {
        return this.http.get(`/city`).toPromise().then((response: any) => {
            return response.json() as City[];
        }).catch((error) => {
            return Promise.reject(JSON.parse(error._body).errorMessage);
        });
    }

}