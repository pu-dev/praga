import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewAccountCreateComponent } from './views/view-account-create/view-account-create.component';
import { ViewAccountListComponent } from './views/view-account-list/view-account-list.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '0', 
    pathMatch: 'full' 
  },
  {
    path: ':tab_idx', 
    component: ViewAccountListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AccountRoutingModule {}
