import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Account }   from '../../../../core/data-types/account';
import { Operation } from '../../../../core/data-types/operation';

import { BackendService } from '../../../../core/services/backend.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';

let i =1;

@Component({
  selector: 'transaction-create-form',
  templateUrl: './transaction-create-form.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './transaction-create-form.component.css'
  ]  
})


export class TransactionCreateFormComponent {
  date: string;// = "20220201";
  debitOp: Operation;
  creditOp: Operation;

  creditAccount: Account;
  debitAccount: Account;

  currencyRate: number;

cashflowCreditAutoValue:number;
  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService
    ) {
    this.date = "20220101";
  }
  

  onSelectDate(date: string) { 
    this.date = date;
    this.autoUpdateCreditAccount();
  }

  onAddTransaction() {   
    this.createTransaction();
  }

  onUpdateDebitOp(op: Operation) {
    this.debitOp = op;
    this.autoUpdateCreditAccount();
  }

  onUpdateCreditOp(op: Operation) {
    this.creditOp = op;
    this.autoUpdateCreditAccount();
  }

  onSelectCreditAccount(account: Account) {
    this.creditAccount = account;
    this.autoUpdateCreditAccount();
  }

  onSelectDebitAccount(account: Account) {
    this.debitAccount = account;
    this.autoUpdateCreditAccount();
  }

  onUpdateCurrencyRate(rate: number) {
    this.currencyRate = rate;
    this.autoUpdateCreditAccount();
  }

  canAutoUpdateCredit(): boolean {
    if (this.debitAccount == undefined) {
      return false;
    }

    if (this.creditAccount == undefined) {
      return false;
    }

    if (this.debitOp == undefined) {
      return false;
    }

    if (this.debitAccount.currency != this.creditAccount.currency ) {
      if (this.currencyRate == undefined) {
        return false;
      }
    }

    return true;
  }

  autoUpdateCreditAccount() {
    if ( ! this.canAutoUpdateCredit() ) {
      return;
    }

    if ( this.debitAccount.currency == this.creditAccount.currency ) {
      this.cashflowCreditAutoValue = -this.debitOp.cashflow;
      return;
    }

    this.cashflowCreditAutoValue = this.debitOp.cashflow * this.currencyRate;
  }

  createTransaction() {
    let ready: boolean = true;
    if (this.date == undefined) ready = false;
    if (this.creditAccount == undefined) ready = false;
    if (this.debitAccount == undefined) ready = false;
    if (this.creditOp == undefined) ready = false;
    if (this.debitOp == undefined) ready = false;

    if ( ! ready ) {
      this.snackbar.show(`Data not ready`);
      return;
    }

    let date: string = this.date;

    let credit_accountId: number = this.creditAccount.id;
    let credit_cashflow: number  = this.creditOp.cashflow;
    let credit_qtyChange: number = this.creditOp.qtyChange;

    let debit_accountId: number = this.debitAccount.id;
    let debit_cashflow: number  = this.debitOp.cashflow;
    let debit_qtyChange: number = this.debitOp.qtyChange;

    let obs = this.backend.createTransaction(
      date,

      debit_accountId,
      debit_cashflow,
      debit_qtyChange,

      credit_accountId,
      credit_cashflow,
      credit_qtyChange,
    );
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show("Transaction created");
      this.toolbox.refresh();
    });
  }
}
