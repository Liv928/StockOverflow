import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { StockApiService} from '@app/stock-api.service';
import {MatTabsModule} from '@angular/material/tabs';


@Component({ templateUrl: 'news.component.html' })
export class NewsComponent {
  user: User;
  public chartOptions;
  displayedNews: string[] = [];
  displayedNewsUrl: string[] = [];
  constructor(private accountService: AccountService, private apiService: StockApiService) {
      this.user = this.accountService.userValue;
  }

  getNew(){
    this.apiService.getNews().subscribe((res) =>{
      for (const item in res){
        //console.log(res[item]);
        this.displayedNews.push(res[item].headline);
        this.displayedNewsUrl.push(res[item].url);
      }
    });
  }

  ngOnInit(){
      this.getNew();
      //console.log(this.displayedNews);
           
  };
  

}