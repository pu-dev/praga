import { NgModule } from '@angular/core';
import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../../core/shared/shared.module';
import { OperationModule } from '../operation/operation.module';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionCreateFormComponent } from './components/transaction-create-form/transaction-create-form.component';

import { ViewTransactionListComponent } from './views/view-transaction-list/view-transaction-list.component';
import { ViewTransactionCreateComponent } from './views/view-transaction-create/view-transaction-create.component';


@NgModule({
declarations: [
    TransactionListComponent,
    TransactionCreateFormComponent,

    ViewTransactionListComponent,
    ViewTransactionCreateComponent,
  ],
  imports: [
    TransactionRoutingModule,
    SharedModule,
    OperationModule,
  ]
})
export class TransactionModule { }
