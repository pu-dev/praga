import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

import { Account } from '../../data-types/account';
import { AccountType } from '../../data-types/account-type';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'account-type-select',
  templateUrl: './account-type-select.component.html',
  styleUrls: [
    '../../shared/select-option.css',
    './account-type-select.component.css'
  ]
})

export class AccountTypeSelectComponent {
  @Output() accountSelected = new EventEmitter<Account>();
  @Input() label: string;

  account: Account;
  accounts: Account[] = [];
  accountTypes: AccountType[] = [
    AccountType.MONEY, 
    AccountType.CRYPTO, 
    AccountType.STOCK];

  accountInput = new FormControl('', [
    Validators.required,
   ]);


  constructor(
    private backend: BackendService,
  ) {
    this.fetchAccounts();
  }
  
  onSelectAccount(account: any) {
    // this.account = account;
    // this.accountSelected.emit(account);
  }

  private fetchAccounts() {
    let obs = this.backend.getAccounts();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.accounts = data.accounts as Account[];
    });
  }

}
