import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CityService } from './services/city.service'
import { WeatherService } from './services/weather.service'
import * as moment from "moment";
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { City } from './shared/models/city';
import { Weather } from './shared/models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CityService, WeatherService],
})
export class AppComponent implements OnInit {
  frmWeather: FormGroup;
  cities: [City] = null;

  /**
   * Chart properties
   */
  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  weatherData: [Weather] = null;
  chartType: string = 'bar';
  chartLabels: string[] = [];
  chartLegend: boolean = true;

  public chartData: any[] = [
    { data: [], label: 'Max Temperature' },
    { data: [], label: 'Min Temperature' }
  ];

  /**
   * Calendar properties
   */
  model: NgbDateStruct;
  date: { year: number, month: number };

  constructor(private fb: FormBuilder, private objCityService: CityService,
    private objWeatherService: WeatherService, private calendar: NgbCalendar) {
    this.frmWeather = fb.group({
      'city': [null],
      'scale': [null]
    });
  }

  /**
   * Initialize screen
   */
  ngOnInit() {
    this.getCities().then(() => {
      this.clear();
    });

    this.selectToday();
  }

  /**
   * Select today in the calendar
   */
  selectToday() {
    this.model = this.calendar.getToday();
  }

  /**
   * Clear weather form
   */
  clear() {
    this.frmWeather.reset({
      city: this.cities.find(obj => obj.city == "Cd. Obregón"),
      scale: "M"
    });

    this.getWeather();
  }

  /**
   * Get cities of sonora
   */
  getCities() {
    return this.objCityService.getCities().then((cities: [City]) => {
      return this.cities = cities;
    }).catch((error) => { });
  }

  /**
   * Get weather info
   */
  getWeather() {
    let weather = this.frmWeather.value;
    if (weather != null && weather.city != null) {
      this.objWeatherService.getWeather(weather.city.longitude, weather.city.latitude, weather.scale).then((weather: [Weather]) => {
        this.setWeather(weather);
      });
    }
  }

  /**
   * Setting values to graph and assigning to table
   * @param weather Weather info
   */
  setWeather(weather: [Weather]) {
    this.weatherData = weather;

    this.chartData = [
      { data: [], label: 'Max Temperature' },
      { data: [], label: 'Min Temperature' }
    ];

    this.chartLabels.splice(0, this.chartLabels.length);

    this.weatherData.forEach((obj: any) => {
      this.chartLabels.push(moment(obj.datetime).format("DD/MM/YYYY"));
      this.chartData[0].data.push(obj.max_temp);
      this.chartData[1].data.push(obj.min_temp);
    });
  }
}

