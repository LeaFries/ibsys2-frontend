import { Component } from '@angular/core';
import log from 'loglevel';
import { ForecastDataType, PlanningService } from '../planning.service';
import { PlanningComponent } from '../planning.component';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  forecast: ForecastDataType[] = [];

  constructor(private planningService: PlanningService, public planningComponent: PlanningComponent) {}

  ngOnInit() {
    this.getForecast();
  }

  getForecast() {
    this.planningService.getForecast().subscribe({
      next: (data) => {
        this.forecast = data as ForecastDataType[];
        log.debug(this.forecast);
      },
      error: (e) => log.debug(e),
      complete: () => {
        log.debug('/api/productionplan/forecast completed');
      }
    });
  }

}
