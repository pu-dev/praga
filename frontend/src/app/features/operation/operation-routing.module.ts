import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewOperationCreateComponent } from './views/view-operation-create/view-operation-create.component';
import { ViewOperationListComponent } from './views/view-operation-list/view-operation-list.component';

const routes: Routes = [
  { 
    path: 'create', 
    component: ViewOperationCreateComponent 
  },
  {
    path: 'list',
    component: ViewOperationListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class OperationRoutingModule {}
