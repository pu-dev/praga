import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewGuestMainComponent } from './views/view-guest-main/view-guest-main.component';

import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { 
    path: 'main', 
    redirectTo: 'web', 
    pathMatch: 'full' 
  },
  { 
    path: 'web',
    loadChildren: () => import('./features/wallet/wallet.module').then((m) => m.WalletModule),
    canLoad: [AuthGuard],
  },  
  // { 
  //   path: 'account',
  //   loadChildren: () => import('./features/account/account.module').then((m) => m.AccountModule),
  //   canLoad: [AuthGuard],
  // },
  // { 
  //   path: 'operation',
  //   loadChildren: () => import('./features/operation/operation.module').then((m) => m.OperationModule),
  //   canLoad: [AuthGuard],
  // },
  // { 
  //   path: 'transaction',
  //   loadChildren: () => import('./features/transaction/transaction.module').then((m) => m.TransactionModule),
  //   canLoad: [AuthGuard],
  // },
  // { 
  //   path: 'fintech',
  //   loadChildren: () => import('./features/fintech/fintech.module').then((m) => m.FintechModule),
  //   canLoad: [AuthGuard],
  // },
  // { 
  //   path: 'user',
  //   loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule),
  // },
  // {
  //   path: 'guest/main', component: ViewGuestMainComponent,
  // },
  { path: '**', redirectTo: 'guest/main' },

];
  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
