import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ViewTransactionListComponent } from './views/view-transaction-list/view-transaction-list.component';
// import { ViewTransactionCreateComponent } from './views/view-transaction-create/view-transaction-create.component';
import { ViewFintechPlayComponent } from './views/view-fintech-play/view-fintech-play.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '0', 
    pathMatch: 'full' 
  },
  {
    path: ':tab_idx', 
    component: ViewFintechPlayComponent,
  },  
  { 
    path: 'play', 
    component: ViewFintechPlayComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FintechRoutingModule {}
