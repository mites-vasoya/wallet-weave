import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  progressValue = 100;
  ngOnInit(): void {
  }

  chartData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  chartWidth = 600;
  chartHeight = 400;
  chartType : ChartType = ChartType.LineChart;

}
