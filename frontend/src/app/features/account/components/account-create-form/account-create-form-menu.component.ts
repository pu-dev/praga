import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { AccountTypes }    from '../../../../core/data-types/account-types';


interface Button {
  title: string;
  onClick: any;
  icon: string;
}

@Component({
  selector: 'account-create-form-menu',
  templateUrl: './account-create-form-menu.component.html',
  styleUrls: ['./account-create-form-menu.component.css']
})

export class AccountCreateFormMenuComponent {
  accountType: AccountTypes = AccountTypes.UNKNOWN;

  @Output() accountTypeEvent = new EventEmitter<AccountTypes>();


  buttons: Button[] = [
    { title: "Money",  icon: "attach_money",  onClick: (() => this.onSelectAccount(AccountTypes.MONEY) ) },
    { title: "Stocks", icon: "category", onClick: (() => this.onSelectAccount(AccountTypes.STOCK) ) },
    { title: "Crypto", icon: "bug_report", onClick: (() => this.onSelectAccount(AccountTypes.CRYPTO) ) },
    { title: "User",   icon: "account_box", onClick: (() => this.onSelectAccount(AccountTypes.USER) ) },
  ]; 
 

  constructor() 
  {
  }

  onSelectAccount(account: AccountTypes) {
    this.accountType = account;
    this.accountTypeEvent.emit(this.accountType);
  }
}
