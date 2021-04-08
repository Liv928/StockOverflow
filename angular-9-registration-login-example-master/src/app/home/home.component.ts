import { Component , OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { HighchartsChartModule } from 'highcharts-angular';
import HighchartsMore from 'highcharts/highcharts-more';

import {MatTabsModule} from '@angular/material/tabs';
import { StockApiService } from '@app/stock-api.service';
//import { write } from 'fs';



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
<<<<<<< HEAD
    public oneMonthData =[];  //initializ an array for stock data
    public fetchedData = [];
    public graphData_x = [];  //oneMonthPrice: number[] = [];
=======
    //initializ an array for stock data
    oneMonthDate: string[] =[]; 
    oneMonthPrice: number[] = [];
    symbol: string[] = [];
    tap = false;
    stockInfo: {symbol: string,name: string,high:string,low:string,volume:string}[] = 
    [{symbol: 'AAPL',name: 'Apple',high: '117.49',low:'116.22',volume:'46691331'},
    {symbol: 'A',name: 'Agilent Technologies Inc.',high: '117.49',low:'116.22',volume:'46691331'},
    {symbol: 'AACG',name: 'ATA Creativity Global - ADR',high: '117.49',low:'116.22',volume:'46691331'},];
>>>>>>> 9aa332a8bd4e0dfee310c5ea611c57d281e8c814

    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 5, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 5, color: 'lightpink'},
      ];

    constructor(private accountService: AccountService, private apiService: StockApiService) {
        this.user = this.accountService.userValue;
    }
<<<<<<< HEAD
   
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
=======
    getonemonthDate(){
      this.apiService.getonemonthDate().subscribe((res)=>{
        for (const item in res){
          this.oneMonthDate.push(res[item].date);
>>>>>>> 9aa332a8bd4e0dfee310c5ea611c57d281e8c814
          
        
      });
      
<<<<<<< HEAD
=======
    }
    getoneMonthPrice(){
      this.apiService.getonemonthDate().subscribe((res)=>{
        for (const item in res){
          this.oneMonthPrice.push(res[item].close);
        }
      }); 
>>>>>>> 9aa332a8bd4e0dfee310c5ea611c57d281e8c814
    }
    
    getSymbol(){
      this.apiService.getSymbol().subscribe((res)=>{
        for (let index = 0; index < 10; index++){
          this.symbol.push(res[index].symbol);
          
        }
      }); 
      
    }
    getStock(){

    }
    clickEvent(){
      let old = this.tap;
      this.tap = !old;
    }
    
    ngOnInit(){
<<<<<<< HEAD
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
=======
        //getData -> return value put into html
        this.getonemonthDate();
        this.getoneMonthPrice();
        this.getSymbol();
        console.log(this.oneMonthDate); 
        console.log(this.oneMonthPrice); 
        console.log(this.symbol); 
>>>>>>> 9aa332a8bd4e0dfee310c5ea611c57d281e8c814
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
