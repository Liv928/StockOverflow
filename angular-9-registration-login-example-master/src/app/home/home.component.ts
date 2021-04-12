import { Component , OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { HighchartsChartModule } from 'highcharts-angular';
import HighchartsMore from 'highcharts/highcharts-more';

import {MatTabsModule} from '@angular/material/tabs';
import { StockApiService } from '@app/stock-api.service';
//import { write } from 'fs';

import data from '../../assets/data.json';



StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  }
});

//const chartdata = data;

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
  }

export interface PeriodicElement {
    symbol: string;
    name: string;
    high: number;
    low: number;
    volume: string;
  }
  const ELEMENT_DATA: PeriodicElement[] =[
    {symbol: 'AAPL',name: 'Apple',high: 117.49,low:116.22,volume:'46691331'},
    {symbol: 'A',name: 'Agilent Technologies Inc.',high: 117.49,low:116.22,volume:'46691331'},
    {symbol: 'AACG',name: 'ATA Creativity Global - ADR',high: 117.49,low:116.22,volume:'46691331'}
  ];

@Component({
  templateUrl: 'home.component.html',  
  selector: 'home.component',
  styleUrls: ['home.component.css'],
})

export class HomeComponent{
    user: User;
    public chartOptions;
    displayedColumns: string[] = ['symbol', 'name', 'high','low','volume'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    public Highcharts = Highcharts;
    public oneMonthData =[];  //initializ an array for stock data
    public fetchedData = [];
    public graphData = [];  //oneMonthPrice: number[] = [];

    public jsonData =data;
    public chartData = [];
    //initializ an array for stock data
    oneMonthDate: string[] =[]; 
    oneMonthPrice: number[] = [];
    symbol: string[] = [];
    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 5, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 5, color: 'lightpink'},
      ];

    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    constructor(private accountService: AccountService, private apiService: StockApiService) {
        this.user = this.accountService.userValue;
    }
    getonemonthDate(){
      this.apiService.getonemonthDate().subscribe((res)=>{
        let i = 0;
        for (const item in res){
          this.graphData[i] = [];
          this.graphData[i].push(res[item].date);
          this.graphData[i].push(res[item].price);
          i++;
        }
      });
      
    }
    getoneMonthPrice(){
      this.apiService.getonemonthDate().subscribe((res)=>{
        for (const item in res){
          this.oneMonthPrice.push(res[item].close);
        }
      }); 
    }
    
    getSymbol(){
      this.apiService.getSymbol().subscribe((res)=>{
        for (let index = 0; index < 10; index++){
          this.symbol.push(res[index].symbol);
          
        }
      }); 
      
    }
    
    ngOnInit(){
        //getData -> return value put into html
        this.getonemonthDate();
        this.getoneMonthPrice();
        this.getSymbol();
        console.log(this.oneMonthDate); 
        console.log(this.oneMonthPrice); 
        console.log(this.symbol); 

        this.chartData = this.jsonData.data;
        console.log(this.chartData);
        var ohlc = [],
            volume = [],
            dataLength = this.chartData.length,
				// set the allowed units for data grouping
            groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]],
            i = 0;
        for (i; i < dataLength; i += 1) {
            ohlc.push([
                this.chartData[i][0], // the date
                this.chartData[i][1], // open
                this.chartData[i][2], // high
                this.chartData[i][3], // low
                this.chartData[i][4] // close
            ]);
            volume.push([
                this.chartData[i][0], // the date
                this.chartData[i][5] // the volume
            ]);
        }

        
        this.chartOptions = {
          rangeSelector: {
						selected: 1,
						inputDateFormat: '%Y-%m-%d'
				},
				title: {
						text: 'Stock Data'
				},
				xAxis: {
						dateTimeLabelFormats: {
								millisecond: '%H:%M:%S.%L',
								second: '%H:%M:%S',
								minute: '%H:%M',
								hour: '%H:%M',
								day: '%m-%d',
								week: '%m-%d',
								month: '%y-%m',
								year: '%Y'
						}
				},
				tooltip: {
						split: false,
						shared: true,
				},
				yAxis: [{
						labels: {
								align: 'right',
								x: -3
						},
						title: {
								text: 'price'
						},
						height: '65%',
						resize: {
								enabled: true
						},
						lineWidth: 2
				}, {
						labels: {
								align: 'right',
								x: -3
						},
						title: {
								text: 'turnover'
						},
						top: '65%',
						height: '35%',
						offset: 0,
						lineWidth: 2
				}],
				series: [{
						type: 'candlestick',
						name: 'AAPL',
						color: 'green',
						lineColor: 'green',
						upColor: 'red',
						upLineColor: 'red',
						tooltip: {
						},
						navigatorOptions: {
								color: Highcharts.getOptions().colors[0]
						},
						data: ohlc,
						dataGrouping: {
								units: groupingUnits
						},
						id: 'sz'
				},{
						type: 'column',
						data: volume,
						yAxis: 1,
						dataGrouping: {
								units: groupingUnits
						}
				}]
        }
      }
}
