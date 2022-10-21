import { NgModule } from '@angular/core';
import { OperationRoutingModule } from './operation-routing.module';
import { SharedModule } from '../../core/shared/shared.module';

import { OperationListComponent } from './components/operation-list/operation-list.component';
import { OperationCreateFormComponent } from './components/operation-create-form/operation-create-form.component';


import { ViewOperationListComponent } from './views/view-operation-list/view-operation-list.component';
import { ViewOperationCreateComponent } from './views/view-operation-create/view-operation-create.component';



@NgModule({
declarations: [
    OperationListComponent,
    OperationCreateFormComponent,

    ViewOperationListComponent,
    ViewOperationCreateComponent,

  ],
  exports: [
    OperationListComponent,
    OperationCreateFormComponent,
  ],
  imports: [
    OperationRoutingModule,
    SharedModule,
  ]
})
export class OperationModule { }
