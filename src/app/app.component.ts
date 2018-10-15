import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CityService } from './services/city.service'
import { WeatherService } from './services/weather.service'
import * as moment from "moment";
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { City } from './shared/models/city';
import { Weather } from './shared/models/weather';
import swal from 'sweetalert2';

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
  dateModel: NgbDateStruct;
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
    this.dateModel = this.calendar.getToday();
  }

  /**
  * Get weather info
  */
  getWeatherByDate(date) {
    let weather = this.frmWeather.value;
    if (weather != null) {
      let start_date = moment(`${this.dateModel.year}-${this.dateModel.month}-${this.dateModel.day}`).format("YYYY-MM-DD");
      let end_date = moment(start_date).add(1, "days").format("YYYY-MM-DD");

      this.objWeatherService.getWeatherByDate(weather.city, weather.scale, start_date, end_date).then((weather: [Weather]) => {
        this.setWeather(weather);
      });
    }
  }


  /**
   * Clear weather form
   */
  clear() {
    if (this.cities != null) {
      this.frmWeather.reset({
        city: "Cd.Obregon",
        scale: "M"
      });

      this.getWeather();
    }
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
    if (weather != null) {
      this.objWeatherService.getWeather(weather.city, weather.scale).then((weather: [Weather]) => {
        this.setWeather(weather);
      });
    }
  }

  /**
   * Setting values to graph and assigning to table
   * @param weather Weather info
   */
  setWeather(weather: any) {
    if (weather.errorMessage != null) {
      return swal({
        position: 'top-end',
        type: 'error',
        title: weather.errorMessage,
        showConfirmButton: false,
        timer: 1500
      })
    }
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

