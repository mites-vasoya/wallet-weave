import {Component, OnInit} from '@angular/core';
import { ChartType } from 'angular-google-charts';
import {ApiService} from "../service/api.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  progressValue = 100;
  wallet_accounts: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.fetchUsersWallet(1).subscribe((data) => {
      this.wallet_accounts = data.data;
    })
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
