import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { NewsComponent } from './news/news.component';
import { CurrencyComponent } from './currency/currency.component';
import { AuthGuard } from './_helpers';
import { CheckpointComponent} from './checkpoint/checkpoint.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'news', component:NewsComponent},
    { path: 'currency', component:CurrencyComponent},
    { path: 'checkpoint', component:CheckpointComponent},
   
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }