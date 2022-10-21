import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewTransactionListComponent } from './views/view-transaction-list/view-transaction-list.component';
import { ViewTransactionCreateComponent } from './views/view-transaction-create/view-transaction-create.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '0', 
    pathMatch: 'full' 
  },
  {
    path: ':tab_idx', 
    component: ViewTransactionCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TransactionRoutingModule {}
