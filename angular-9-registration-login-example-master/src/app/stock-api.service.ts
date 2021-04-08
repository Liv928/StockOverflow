import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StockData } from './models/stock-data';
@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private heroesUrl = 'https://cloud.iexapis.com/stable/stock/googl/quote?displayPercent=true&token=pk_9b3e50aa00274c0a8143cbf1cd6f0048 ';  // URL to web api
  private curUrl = 'https://cloud.iexapis.com/stable/crypto/btcusdt/quote?token=pk_9b3e50aa00274c0a8143cbf1cd6f0048';

  //private baseUrl = 'https://cloud.iexapis.com/stable/stock/';  // URL to web api
  private onemonthUrl = 'https://cloud.iexapis.com/stable/stock/twtr/chart/1m?token=pk_fe5c85583f254341bb4298aa4761ae82';
  private newsUrl = 'https://cloud.iexapis.com/stable/stock/aapl/news?token=pk_fe5c85583f254341bb4298aa4761ae82';
  displayedNews: string[] = [];
  oneMonthDate: string[] = [];
  oneMonthPrice: number[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  getonemonthDate(){
   return this.http.get(this.onemonthUrl); //obeject array

  }

  getNews(){
    return this.http.get(this.newsUrl);
  }

  getCurrency(){
    return this.http.get(this.curUrl);
  }
 
  
}
