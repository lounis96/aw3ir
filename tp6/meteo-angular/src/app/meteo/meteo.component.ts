import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  cityList: string[] = [];
  cityName: string = '';
  weatherData: any = null;

  constructor(private meteoService: MeteoService) {}

  ngOnInit(): void {
    const storedList = localStorage.getItem('cityList');
    if (storedList) {
      this.cityList = JSON.parse(storedList);
    }
  }

  // Ajouter une ville
  onSubmit(): void {
    const trimmedName = this.cityName.trim();
    if (trimmedName && !this.cityList.includes(trimmedName)) {
      this.cityList.push(trimmedName);
      localStorage.setItem('cityList', JSON.stringify(this.cityList));
      this.getWeather(trimmedName);
      this.cityName = '';
    }
  }

  // Supprimer une ville
  removeCity(name: string): void {
    this.cityList = this.cityList.filter(city => city !== name);
    localStorage.setItem('cityList', JSON.stringify(this.cityList));
    if (this.weatherData?.name === name) {
      this.weatherData = null;
    }
  }

  // Récupérer la météo pour une ville
  getWeather(name: string): void {
    this.meteoService.getWeather(name).subscribe({
      next: (data) => this.weatherData = data,
      error: (err) => {
        console.error(err);
        alert(`Impossible de récupérer la météo pour "${name}". Vérifie le nom de la ville.`);
      }
    });
  }

  // Cliquer sur une ville de la liste pour voir sa météo
  showWeather(city: string): void {
    this.getWeather(city);
  }
}
