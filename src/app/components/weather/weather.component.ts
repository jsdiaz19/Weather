import { Component } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Temperature } from 'src/app/models/temperature.model';
import { HttpService } from 'src/app/services/Http/http.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  currentCity: Omit<City,"id" | "name" | "region"|"country"> | Omit<City,"city" | "country_name" | "geoname_id"> | null = null;
  weather: Temperature = {
    current: {
      temp_c: 0,
      temp_f: 0,
      wind_kph: 0,
      wind_mph: 0,
      humidity: 0,
      condition: {
        text: '',
        icon: ''
      }
    },
    location: {
      localtime: ''
    }
  };
  private citySubscription!: Subscription;
  constructor(private session:SessionService, private http:HttpService){}

  ngOnInit(){
    this.citySubscription = this.session.citySubject.subscribe((currentCity:  Omit<City,"id" | "name" | "region"|"country"> | Omit<City,"city" | "country_name" | "geoname_id"> | null)=> {
      if( currentCity != null){
        this.currentCity = currentCity;
        this.http.getCurrentWeather(currentCity).subscribe((weather:Temperature)=> {
          this.weather = weather;
        })
      }
    })
  }

  get cityName(): string {
    if (!this.currentCity) return '';
    return (this.currentCity as any).city ?? (this.currentCity as any).name ?? '';
  }

  ngOnDestroy() {
    this.citySubscription.unsubscribe();
  }

}
