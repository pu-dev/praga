import { Component, Input } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { BackendService }  from '../../../../core/services/backend.service';
import { SnackbarService }  from '../../../../core/services/snackbar.service';

import { CurrencyCode }    from '../../../../core/data-types/currency';
import { AccountType }     from '../../../../core/data-types/account-type';


@Component({
  selector: 'account-user-create-form',
  templateUrl: './account-user-create-form.component.html',
  styleUrls: ['./account-user-create-form.component.css']

})

export class AccountUserCreateFormComponent {
  accountName: string = "";
  currency: CurrencyCode = {code:""} as CurrencyCode;

  accountNameInput = new FormControl('', [
    Validators.required,
    Validators.minLength(4),

   ]);

  constructor(
    private backend: BackendService,
    private snackbar: SnackbarService,
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
    this.snackbar.show("Users account currently not supported")
  //   let obs = this.backend.createAccountUser(accountName, currencyCode);
  //   obs.subscribe((result: any) => {
  //     const data = result.data;
      // this.snackbar.show(`Account ${accountName} created`);
  //   });
  }
}
