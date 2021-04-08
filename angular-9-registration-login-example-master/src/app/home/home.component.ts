import { Component , OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { HighchartsChartModule } from 'highcharts-angular';

import HighchartsMore from 'highcharts/highcharts-more';

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

  export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    public chartOptions;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    public Highcharts = Highcharts;
    
    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 3, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 4, rows: 1, color: '#DDBDF1'},
      ];

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(){
        
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