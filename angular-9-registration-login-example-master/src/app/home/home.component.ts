import { Component , OnInit } from '@angular/core';


import { User } from '@app/_models';
import { AccountService } from '@app/_services';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { HighchartsChartModule } from 'highcharts-angular';
import HighchartsMore from 'highcharts/highcharts-more';

import {MatTabsModule} from '@angular/material/tabs';
import { StockApiService } from '@app/stock-api.service';

StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  }
});


export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
  }


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    public chartOptions;
    public Highcharts = Highcharts;

    
    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 5, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 5, color: 'lightpink'},
        
      ];
    
    constructor(private accountService: AccountService, private apiService: StockApiService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(){
        this.apiService.getStocks().subscribe((res)=>{
          console.log(res);
        })
        
        this.chartOptions = {
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'middle',
            itemHoverStyle: {
              color: 'red',
            }
          },
          rangeSelector: {
            selected: 2
          },
          title: {text: 'Stock Data'},
          series: [{
            showInLegend: true,
            type: 'line',
            name: '',
            tooltip: {
              valueDecimals: 2
            },
            data:[]
          }],
          yAxis: {
            opposite: false,
            title: {}
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%H:%M'
            },
            minRange: 1000,
            minTickInterval: 1000 
          }
        }
      };
    

}