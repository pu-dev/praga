import { Component } from '@angular/core';

import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';

import { Transaction } from '../../../../core/data-types/transaction';
import { AccountMoney } from '../../../../core/data-types/account-money';
import { AccountExAsset } from '../../../../core/data-types/account-ex-asset';
import { AccountTypes } from '../../../../core/data-types/account-types';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent {
  transactions: Transaction[];

  transactionDisplayedColumns: string[] = [
    'controls',
    'idx', 
    'trans-cashflow',
    'trans-date',
    'trans-credit-account-name', 
    'trans-credit-qty-change', 
    'trans-debit-account-name', 
    'trans-debit-qty-change', 
  ];

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService
  ) {
    this.fetchTransactions();
  }
  
  getCreditAccont(idx: number): string {
    let transaction = this.transactions[idx];
    let operation = transaction.creditOp;
    return this.getAccountName(operation);
  }

  getDebitAccont(idx: number): string {
    let transaction = this.transactions[idx];
    let operation = transaction.debitOp;
    return this.getAccountName(operation);
  }

  onDeleteTransaction(trans_id: number) {
    let obs = this.backend.deleteTransaction(trans_id);
    obs.subscribe((result: any) => {
      this.toolbox.refresh();
    });
  }

  private getAccountName(operation: any): string {
    if (operation.accountType == AccountTypes[AccountTypes.MONEY]) {
      let account = operation.accountMoney as AccountMoney;
      return account.name;
    }

    if (operation.accountType == AccountTypes[AccountTypes.ASSET_EX]) {
      let account = operation.accountExAsset as AccountExAsset;
      return account.asset.globalname;
    }

    return "Unknown";
  }

  private fetchTransactions() {
    let obs = this.backend.getTransactions();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.transactions = data.transactions as Transaction[];
    });
  }
}
