import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

import { Account } from '../../data-types/account';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'account-select',
  templateUrl: './account-select.component.html',
  styleUrls: [
    '../../shared/select-option.css',
    './account-select.component.css'
  ] 
})

export class AccountSelectComponent {
  @Output() accountSelected = new EventEmitter<Account>();
  @Input() label: string;

  account: Account;
  accounts: Account[] = [];
  accountInput = new FormControl('', [
    Validators.required,
   ]);


  constructor(
    private backend: BackendService,
  ) {
    this.fetchAccounts();
  }
  
  onSelectAccount(account: Account) {
    this.account = account;
    this.accountSelected.emit(account);
  }

  private fetchAccounts() {
    let obs = this.backend.getAccounts();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.accounts = data.accounts as Account[];
    });
  }

}
