import { Component, Input } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { BackendService }  from '../../../../core/services/backend.service';
import { ToolboxService }  from '../../../../core/services/toolbox.service';
import { SnackbarService }  from '../../../../core/services/snackbar.service';

import { CurrencyCode }    from '../../../../core/data-types/currency';
import { AccountType }     from '../../../../core/data-types/account-type';


@Component({
  selector: 'account-money-create-form',
  templateUrl: './account-money-create-form.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './account-money-create-form.component.css'
  ]
})

export class AccountMoneyCreateFormComponent {
  accountName: string = "";
  currency: CurrencyCode = {code:""} as CurrencyCode;

  accountNameInput = new FormControl('', [
    Validators.required,
    Validators.minLength(4),

   ]);

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService,
    private router: Router,
    ) 
  {
  }

  onChangeAccountName(accountName: string) {
    this.accountName = accountName;
  }

  onSelectCurrency(currency: CurrencyCode) {
    this.currency = currency as CurrencyCode;
  }

  onCreateAccount() {
    this.createAccount(this.accountName, this.currency.code);
  }

  private createAccount(accountName: string, currencyCode: string) {
    let obs = this.backend.createAccountMoney(accountName, currencyCode);
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Account ${accountName} created`);
      this.toolbox.refresh();
    });
  }
}
