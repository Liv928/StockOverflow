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
    public oneMonthData =[];  //initializ an array for stock data
    public fetchedData = [];
    public graphData_x = [];  //oneMonthPrice: number[] = [];

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
          let temp = []
          //var tempDate = new Date(res[item].date);
          //var tms = Date.UTC(tempDate.getUTCFullYear(),tempDate.getMonth(),tempDate.getDate(),tempDate.getHours(),tempDate.getMinutes());
          temp.push(res[item].date);
          temp.push(res[item].close);
          
          this.fetchedData.push(temp);
          console.log("in the loop-----",this.fetchedData);
        }
         /*
        for (const item in res){
          // store the pair array [datetime, price]
          let temp = []
          //var tempDate = new Date(res[item].date);
          //var tms = Date.UTC(tempDate.getUTCFullYear(),tempDate.getMonth(),tempDate.getDate(),tempDate.getHours(),tempDate.getMinutes());
          temp.push(res[item].date)
          temp.push(res[item].close)
          
          this.fetchedData.push(res[item]);
          console.log(this.fetchedData); 
          
          //截止目前正确 oneMonthData 存储的是[date, price]
          //push the pair into 2-d array
          //this.graphData.push(this.oneMonthData);
          */
          
        
      });
      
    }
    

    ngOnInit(){
        /*
        this.apiService.getonemonthDate().subscribe((res)=>{
          console.log(res)
          for (const item in res){
            let temp = []
            //var tempDate = new Date(res[item].date);
            //var tms = Date.UTC(tempDate.getUTCFullYear(),tempDate.getMonth(),tempDate.getDate(),tempDate.getHours(),tempDate.getMinutes());
            temp.push(res[item].date);
            temp.push(res[item].close);
            
            this.fetchedData.push(temp);
            console.log("in the loop-----"+this.fetchedData);
          }
        });*/
        this.getonemonthData();
        console.log("out the loop------"+this.fetchedData); 
        
        //getData -> return value put into html
        //this.getonemonthData();
        //this.getoneMonthPrice();
        
        //console.log(this.oneMonthPrice); 
        this.chartOptions = {
          chart:{
          },
          plotOptions: {
          },
          title: {text: 'Stock Data'},
          series: [{
            name: '',
            tooltip: {
              valueDecimals: 2,
            },
            data:this.oneMonthData
          }],
          yAxis: {
            title: {text:'Celsius'}
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              week: '%Y-%m-%d'
            },
           
          }
        }
    
    
      }
}
