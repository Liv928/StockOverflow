import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { StockApiService} from './stock-api.service';
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService, private apiService: StockApiService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
    /**
     * execute during initial run time
     * 
     */
    ngOnInit(){
        this.apiService.getStocks().subscribe((res)=>{
            console.log(res);
          });      
    }
}