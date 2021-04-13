import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StockData } from './models/stock-data';
@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private baseUrl = 'https://cloud.iexapis.com/stable/stock/';  // URL to web api
  private onemonthUrl = 'https://cloud.iexapis.com/stable/stock/twtr/chart/1m?token=pk_fa5601b615df4b88a57eb3044352da89';
  private newsUrl = 'https://cloud.iexapis.com/stable/stock/aapl/news?token=pk_fa5601b615df4b88a57eb3044352da89 ';
  private symbolUrl = 'https://cloud.iexapis.com/beta/ref-data/symbols?token=pk_fa5601b615df4b88a57eb3044352da89 ';
  private curUrl = '';

  oneMonthDate: string[] = [];
  oneMonthPrice: number[] = [];
  displayedNews: string[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  getonemonthDate(){
   return this.http.get(this.onemonthUrl); //obeject array

  }

  getStockInfo(){
    return this.http.get(this.baseUrl);
  }
  
  getNews(){
    return this.http.get(this.newsUrl);
  }
  
  getSymbol(){
    return this.http.get(this.symbolUrl);
  }

  getCurrency(){
    return this.http.get(this.curUrl); 
  }
}
