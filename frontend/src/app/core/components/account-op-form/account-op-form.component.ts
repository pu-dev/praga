import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

import { Account }        from '../../data-types/account';
import { AccountType }    from '../../data-types/account-type';
import { Asset }          from '../../data-types/asset';
import { AssetPrice }     from '../../data-types/asset-price';
import { Operation }      from '../../data-types/operation';

import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'account-op-form',
  templateUrl: './account-op-form.component.html',
  styleUrls: ['./account-op-form.component.css']
})


export class AccountOpFormComponent {
  @Output() dataUpdated = new EventEmitter<Operation>();
  @Output() accountSelected = new EventEmitter<Account>();

  @Input() title: string;
  @Input() date: string;
  @Input()
  set accountType(type_: string) {
    this.type = type_;
  }

  @Input() 
  set cashflowValue(cashflow: number) {
    if (cashflow == undefined) {
      return;
    }
    this.cashflow = +cashflow;
    this.onChangeCashflow(this.cashflow);
  }

  @Output() dateSelected = new EventEmitter<string>();
  @Input() showDateSetter: boolean = false;

  account: Account;
  assetPrice: AssetPrice;
  cashflow: number = 0;
  qtyChange: number = 0;
  type: string;

  constructor(
    private backend: BackendService
  ) {
  }

  onSelectAccount(account: Account) {
    this.account = account;
    this.updateQtyChange();
    this.emitData();

    this.accountSelected.emit(account);
  }

  onChangeCashflow(cashflow: number) {
    this.cashflow = cashflow;
    this.updateQtyChange();
    this.emitData();
  }

  onChangeQuantity(qtyChange: number) {
    this.qtyChange = qtyChange;
    this.emitData();
  }

  onPriceUpdate(price: AssetPrice) {
    this.assetPrice = price;
    this.updateQtyChange();
    this.emitData(); 
  }

  onSelectDate(date: string) {
    this.date = date;
    this.dateSelected.emit(date);
  }

  isAccountMoney(): boolean {
    if (this.account == undefined) {
      return false;
    }
    return this.account.type == AccountType.MONEY;
  }

  private emitData() {
    if ( ! this.isDataComplete()) {
      return;
    }

    let opDef: Operation = {
      id: -1,
      account: this.account,
      dateTxt: this.date,
      qtyChange: this.qtyChange,
      cashflow: this.cashflow,
      note: ""
    }

    this.dataUpdated.emit(opDef);
  }

  private isDataComplete(): boolean {
    if (this.date == undefined) {
      return false;
    }

    if (this.account == undefined) {
      return false;
    }

    if (this.cashflow == undefined) {
      return false;
    }

    if (this.account.type != AccountType.MONEY) {
      if (this.qtyChange == undefined) {
        return false;
      }
    }

    return true;
  }

  private updateQtyChange() {
    if (this.account == undefined) {
      return;
    }

    if (this.account.type != AccountType.MONEY) {
      if (this.assetPrice == undefined) {
        return;
      }
      if (this.cashflow == undefined) {
        return;
      }

      let qtyChange = this.cashflow / +this.assetPrice.priceClose;
      this.qtyChange = qtyChange;
    }
    else {
      this.qtyChange = this.cashflow; 
    }
  }
}

