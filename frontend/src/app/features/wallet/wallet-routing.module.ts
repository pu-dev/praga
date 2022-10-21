import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewWalletListComponent } from './views/view-wallet-list/view-wallet-list.component';
import { ViewWalletEditComponent } from './views/view-wallet-edit/view-wallet-edit.component';

const routes: Routes = [
  // { 
  //   path: 'create', 
  //   component: ViewOperationCreateComponent 
  // },
  {
    path: 'list',
    component: ViewWalletListComponent 
  },
  {
    path: 'edit',
    component: ViewWalletEditComponent 
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class WalletRoutingModule {}
