import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { StockApiService} from '@app/stock-api.service';
import {MatTabsModule} from '@angular/material/tabs';


@Component({ templateUrl: 'checkpoint.component.html' })
export class CheckpointComponent {
  user: User;
  public chartOptions;
  displayedNews: string[] = [];
  displayedNewsUrl: string[] = [];
  constructor(private accountService: AccountService, private apiService: StockApiService) {
      this.user = this.accountService.userValue;
  }

  ngOnInit(){
  }

}