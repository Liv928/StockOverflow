import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StockData } from './models/stock-data';
@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private baseUrl = 'https://cloud.iexapis.com/stable/stock/';  // URL to web api
  private onemonthUrl = 'https://cloud.iexapis.com/stable/stock/twtr/chart/1m?token=pk_9b3e50aa00274c0a8143cbf1cd6f0048';
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
  getonemonthPrice(){
    return this.http.get(this.onemonthUrl);
    
  }
  getStocks(){
      return this.http.get(this.baseUrl);
  }
}
