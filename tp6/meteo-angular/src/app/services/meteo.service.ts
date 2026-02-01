import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private apiKey = '514407a1c0c3bb968b02fa77c3156584';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(cityName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${cityName}&appid=${this.apiKey}&units=metric&lang=fr`);
  }
}
