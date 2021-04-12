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
  export interface CurrencyElement {
    name: string;
    position: number;
    price: number;
    symbol: string;
  }
  const ELEMENT_DATA: PeriodicElement[] =[
    {symbol: 'AAPL',name: 'Apple',high: 117.49,low:116.22,volume:'46691331'},
    {symbol: 'A',name: 'Agilent Technologies Inc.',high: 117.49,low:116.22,volume:'46691331'},
    {symbol: 'AACG',name: 'ATA Creativity Global - ADR',high: 117.49,low:116.22,volume:'46691331'}
  ];
  const CURRENCY_DATA: CurrencyElement[] = [
    {position: 1, name: 'Australian dollar', price: 1.079, symbol: 'AUD'},
    {position: 2, name: 'Singapore dollar', price: 4.026, symbol: 'SGD'},
    {position: 3, name: 'Chinese renminbi',  price: 6.941, symbol: 'RMB'},
    {position: 4, name: 'European euro',  price: 9.022, symbol: 'EUR'},
    {position: 5, name: 'Hong Kong dollar',  price: 10.11, symbol: 'HKD'},
    {position: 6, name: 'Russian ruble',  price: 12.007, symbol: 'SUR'},
    {position: 7, name: 'Japanese yen',  price: 14.067, symbol: 'JPY'},
    {position: 8, name: 'Mexican peso',  price: 15.994, symbol: 'MXN'},
    {position: 9, name: 'New Zealand dollar',  price: 18.984, symbol: 'NZD'},
    
  ];

@Component({
  templateUrl: 'home.component.html',  
  selector: 'home.component',
  styleUrls: ['home.component.css'],
})

export class HomeComponent{
    user: User;
    public chartOptions;
    public currency_chartOptions;

    

    public Highcharts = Highcharts;
    public oneMonthData =[];  //initializ an array for stock data
    public fetchedData = [];
    public graphData = [];  //oneMonthPrice: number[] = [];

    public jsonData =data;
    public chartData = [];

    public currency_check = false;
    public stockchart_check = false;
    public stocktable_check = false;
    public news_check = false;

    // news section 
    public displayedNews: string[] = [];
    public displayedNewsUrl: string[] = [];

    // stock table section
    public displayedColumns: string[] = ['symbol', 'name', 'high','low','volume'];
    public dataSource = new MatTableDataSource(ELEMENT_DATA);
    
    // currency section
    public currencyColumns: string[] = ['position', 'name', 'price', 'symbol'];
    public currencySource = CURRENCY_DATA;



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

        this.currency_chartOptions = {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'The latest Currency'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: null
            }
          },
          colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
          yAxis: {
            title: {
              text: 'prices (m)'
            },
            min: 0
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          series: [{
            name: '2018-2019',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
              [Date.UTC(2020,  9, 27), 0   ],
              [Date.UTC(2020, 10, 10), 0.6 ],
              [Date.UTC(2020, 10, 18), 0.7 ],
              [Date.UTC(2020, 11,  2), 0.8 ],
              [Date.UTC(2020, 11,  9), 0.6 ],
              [Date.UTC(2020, 11, 16), 0.6 ],
              [Date.UTC(2020, 11, 28), 0.67],
              [Date.UTC(2021,  0,  1), 0.81],
              [Date.UTC(2021,  0,  8), 0.78],
              [Date.UTC(2021,  0, 12), 0.98],
              [Date.UTC(2021,  0, 27), 1.84],
              [Date.UTC(2021,  1, 10), 1.80],
              [Date.UTC(2021,  1, 18), 1.80],
              [Date.UTC(2021,  1, 24), 1.92],
              [Date.UTC(2021,  2,  4), 2.49],
              [Date.UTC(2021,  2, 11), 2.79],
              [Date.UTC(2021,  2, 15), 2.73],
              [Date.UTC(2021,  2, 25), 2.61],
              [Date.UTC(2021,  3,  2), 2.76],
              [Date.UTC(2021,  3,  6), 2.82],
              [Date.UTC(2021,  3, 13), 2.8 ],
              [Date.UTC(2021,  4,  3), 2.1 ],
              [Date.UTC(2021,  4, 26), 1.1 ],
              [Date.UTC(2021,  5,  9), 0.25],
              [Date.UTC(2021,  5, 12), 0.35 ]
            ]
          }, {
            name: '2019-2020 ',
            data: [
              [Date.UTC(2020,  9, 18), 0   ],
              [Date.UTC(2020,  9, 26), 0.2 ],
              [Date.UTC(2020, 11,  1), 0.47],
              [Date.UTC(2020, 11, 11), 0.55],
              [Date.UTC(2020, 11, 25), 1.38],
              [Date.UTC(2021,  0,  8), 1.38],
              [Date.UTC(2021,  0, 15), 1.38],
              [Date.UTC(2021,  1,  1), 1.38],
              [Date.UTC(2021,  1,  8), 1.48],
              [Date.UTC(2021,  1, 21), 1.5 ],
              [Date.UTC(2021,  2, 12), 1.89],
              [Date.UTC(2021,  2, 25), 2.0 ],
              [Date.UTC(2021,  3,  4), 1.94],
              [Date.UTC(2021,  3,  9), 1.91],
              [Date.UTC(2021,  3, 13), 1.75],
              [Date.UTC(2021,  3, 19), 1.6 ],
              [Date.UTC(2021,  4, 25), 0.6 ],
              [Date.UTC(2021,  4, 31), 0.35],
              [Date.UTC(2021,  5,  7), 0.44]
            ]
          }, {
            name: '2020-2021 ',
            data: [
              [Date.UTC(2020,  9,  9), 0   ],
              [Date.UTC(2020,  9, 14), 0.15],
              [Date.UTC(2020, 10, 28), 0.35],
              [Date.UTC(2020, 11, 12), 0.46],
              [Date.UTC(2021,  0,  1), 0.59],
              [Date.UTC(2021,  0, 24), 0.58],
              [Date.UTC(2021,  1,  1), 0.62],
              [Date.UTC(2021,  1,  7), 0.65],
              [Date.UTC(2021,  1, 23), 0.77],
              [Date.UTC(2021,  2,  8), 0.77],
              [Date.UTC(2021,  2, 14), 0.79],
              [Date.UTC(2021,  2, 24), 0.86],
              [Date.UTC(2021,  3,  4), 0.8 ],
              [Date.UTC(2021,  3, 18), 0.94],
              [Date.UTC(2021,  3, 24), 0.9 ],
              [Date.UTC(2021,  4, 16), 0.39],
              [Date.UTC(2021,  4, 21), 0.49]
            ]
          }]
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
