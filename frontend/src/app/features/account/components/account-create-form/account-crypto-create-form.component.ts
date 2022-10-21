import { Component, Input } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { BackendService }  from '../../../../core/services/backend.service';
import { ToolboxService }  from '../../../../core/services/toolbox.service';
import { SnackbarService }  from '../../../../core/services/snackbar.service';

import { CurrencyCode }    from '../../../../core/data-types/currency';
import { Asset }           from '../../../../core/data-types/asset';
import { Exchange }        from '../../../../core/data-types/exchange';


@Component({
  selector: 'account-crypto-create-form',
  templateUrl: './account-crypto-create-form.component.html',
    styleUrls: [
    '../../../../core/shared/globals.css',
    './account-crypto-create-form.component.css'
  ]
})

export class AccountCryptoCreateFormComponent {
  crypto: Asset;

  accountNameInput = new FormControl('', [
    Validators.required,
   ]);

  accountName: string = "";

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService,
    ) 
  {
  }

  onSelectCrypto(crypto: Asset) {
    this.crypto = crypto;
    let tmp = crypto.name.split('-')[0];
    this.accountName = `${tmp}`;
  }

  onChangeAccountName(accountName: string) {
    this.accountName = accountName;
  }

  getCurrency(): string {
    if (this.crypto == undefined) {
      return "";
    }
    return "USD"
    return `${this.crypto.exchange.currency}`;
  }

  onCreateAccount() {
    this.createAccount();
  }

  private createAccount() {
    let obs = this.backend.createAccountCrypto(
      this.accountName,
      this.crypto.name.split('-')[0]
    );
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Account ${this.accountName} created`);
      this.toolbox.refresh();
    });
  }
}
