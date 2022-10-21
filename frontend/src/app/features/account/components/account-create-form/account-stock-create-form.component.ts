import { Component, Input } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { BackendService }  from '../../../../core/services/backend.service';
import { ToolboxService }  from '../../../../core/services/toolbox.service';
import { SnackbarService }  from '../../../../core/services/snackbar.service';

import { CurrencyCode }    from '../../../../core/data-types/currency';
import { Asset }           from '../../../../core/data-types/asset';
import { Exchange }        from '../../../../core/data-types/exchange';


@Component({
  selector: 'account-stock-create-form',
  templateUrl: './account-stock-create-form.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './account-stock-create-form.component.css'
  ]
})

export class AccountStockCreateFormComponent {
  currencyCode: CurrencyCode;
  exchange: Exchange;
  asset: Asset;

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

  onSelectExchange(ex: Exchange) {
    this.exchange = ex;
  }

  onSelectAsset(asset: Asset) {
    this.asset = asset;
    this.accountName = `${asset.name}.${asset.exchange.eid}`;
  }

  onChangeAccountName(accountName: string) {
    this.accountName = accountName;
  }

  getExchangeEid(): string {
    if (this.exchange == undefined) {
      return "";
    }

    return this.exchange.eid;
  }

  getAccountName(): string {
    if (this.asset == undefined) {
      return "";
    }

    return `${this.asset.name}.${this.asset.exchange.eid}`;
  }

  getCurrency(): string {
    if (this.exchange == undefined) {
      return "";
    }

    return `${this.exchange.currency}`;
  }

  onCreateAccount() {
    this.createAccount();
  }

  private createAccount() {
    let obs = this.backend.createAccountStock(
      this.accountName,
      this.asset.name,
      this.asset.exchange.eid
    );
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Account ${this.accountName} created`);
      this.toolbox.refresh();
    });
  }
}
