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

    
    //initializ an array for stock data
    oneMonthData: (string|number)[] =[]; 
    //oneMonthPrice: number[] = [];
    graphData :any[][] = []; 

    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 5, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 5, color: 'lightpink'},
        
      ];
    

    constructor(private accountService: AccountService, private apiService: StockApiService) {
        this.user = this.accountService.userValue;
    }
    getonemonthData(){
      this.apiService.getonemonthDate().subscribe((res)=>{
        for (const item in res){
          // store the pair array [datetime, price]
          this.oneMonthData.push(res[item].date);
          this.oneMonthData.push(res[item].close);
          //console.log(this.oneMonthDate); 
          //截止目前正确 oneMonthData 存储的是[date, price]
          //push the pair into 2-d array
          this.graphData.push(this.oneMonthData);
          
        }
      });
      
      
    }
    

    ngOnInit(){
        this.apiService.getonemonthDate().subscribe((res)=>{
          console.log(res);
        })
        
        //getData -> return value put into html
        this.getonemonthData();
        //this.getoneMonthPrice();
        console.log(this.graphData); 
        //console.log(this.oneMonthPrice); 
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