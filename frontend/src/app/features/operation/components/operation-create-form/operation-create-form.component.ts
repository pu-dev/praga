import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Account } from '../../../../core/data-types/account';
import { AccountType } from '../../../../core/data-types/account-type';
import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { AssetPrice } from '../../../../core/data-types/asset-price';
import { Operation } from '../../../../core/data-types/operation';


export enum AssetSelectedState {
  HIDDEN,
  LOADING,
  LOADED
};


@Component({
  selector: 'operation-create-form',
  templateUrl: './operation-create-form.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './operation-create-form.component.css'
  ]   
})

export class OperationCreateFormComponent {
  date: string;
  account: Account;
  cashflow: number;

  assetPrice: AssetPrice;
  qtyChange: string = "0";

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService,
  ) {}
  

  onOperationAdd() {   
    if ( ! this.validInput() ) {
      return;
    }

    if (this.account.type == AccountType.MONEY) {
      this.createOperation(
        this.account.id, 
        this.date, 
        this.cashflow, 
        this.cashflow);
    }
    else {
      this.createOperation(
        this.account.id, 
        this.date, 
        this.cashflow, 
        +this.qtyChange);
    }
  }

  onSelectAccount(account: Account) {
    this.account = account;
  }

  onSelectDate(date: string) { 
    this.date = date;
  }

  onPriceUpdate(price: AssetPrice) {
    this.assetPrice = price;
  }

  onChangeCashflow(cashflow: number) {
    this.cashflow = cashflow;

    if (this.assetPrice == undefined) {
      return;
    }
    let qtyChange = this.cashflow / +this.assetPrice.priceClose;
    // let qtyChangeRounded =  qtyChange.toFixed(2);
    this.qtyChange = `${qtyChange}`;
  }

  onChangeQuantity(qtyChange: number) {
    this.qtyChange = `${qtyChange}`;
  }

  onUpdateOpInfo(opInfo: Operation) {
    this.cashflow = opInfo.cashflow;
    this.qtyChange = `${opInfo.qtyChange}`;
  }

  isAccountMoney(): boolean {
    return this.account.type == AccountType.MONEY;
  }

  private validInput(): boolean  {
    if (this.date == undefined) {
      this.snackbar.show("Enter operation date");
      return false;
    }    

    if ( this.account == undefined) {
      this.snackbar.show("Select account");
      return false;
    }

    if ( this.cashflow == undefined ) {
      this.snackbar.show("Enter valid cashflow");
      return false;
    }

    if ( this.account.type != AccountType.MONEY) {

      if (this.qtyChange == "0" || this.qtyChange == "") {
        this.snackbar.show("Enter valid quantity change");
        return false;
      }
    }

    return true;
  }

  private createOperation(accountId: number, date: string, cashflow: number, qtyChange: number) {

    let obs = this.backend.createOperation(
      accountId, 
      date, 
      cashflow, 
      qtyChange, 
      ""
     );

    obs.subscribe((result: any) => {
      this.snackbar.show("Operation created");
      this.toolbox.refresh();
    });
  }

}
