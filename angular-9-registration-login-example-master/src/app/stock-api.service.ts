import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Stock } from './stock';
@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private heroesUrl = 'https://cloud.iexapis.com/stable/stock/googl/quote?displayPercent=true&token=pk_9b3e50aa00274c0a8143cbf1cd6f0048 ';  // URL to web api
  private curUrl = 'https://cloud.iexapis.com/stable/crypto/btcusdt/quote?token=pk_9b3e50aa00274c0a8143cbf1cd6f0048';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  getStocks(){
      return this.http.get(this.heroesUrl);
  }

  getCurrency(){
    return this.http.get(this.curUrl);
  }
}
