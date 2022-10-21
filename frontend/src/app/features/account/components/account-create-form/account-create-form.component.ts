import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';

import { AccountTypes }    from '../../../../core/data-types/account-types';
import { BackendService }  from '../../../../core/services/backend.service';
import { Currency }        from '../../../../core/data-types/currency';
import { CurrencyService } from '../../../../core/services/currency.service';
import { ExAsset }         from '../../../../core/data-types/ex-asset';


@Component({
  selector: 'account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './account-create-form.component.css'
  ]
})

export class AccountCreateFormComponent {
  currencies: Currency[];
  selectedCurrency: Currency;
  exAssets: ExAsset[];
  accountType: AccountTypes = AccountTypes.UNKNOWN;

  chooseAccountFormGroup = this.formBuilder.group({
  });

  configureAccountFormGroup = this.formBuilder.group({
    accountName: ['', Validators.required],
    accountCurrency: ['', Validators.required],
    assetId: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private currencyServ: CurrencyService,
    ) 
  {
    this.currencyServ.fetchCurrencies((currencies: any) => { 
      this.currencies = currencies;
    });
  }

  setAccountType(account: AccountTypes) {
    this.accountType = account;
  }

  isAccountUnknown() {
    return this.accountType == AccountTypes.UNKNOWN;
  }

  isAccountMoney() {
    return this.accountType == AccountTypes.MONEY;
  }

  isAccountStock() {
    return this.accountType == AccountTypes.STOCK;
  }

  isAccountCrypto() {
    return this.accountType == AccountTypes.CRYPTO;
  }

  isAccountUser() {
    return this.accountType == AccountTypes.USER;
  }

  setAccountMoney() {
    this.accountType = AccountTypes.MONEY;
  }

  setAccountAssetExchange() {
    this.fetchAssetsExchange();
    this.accountType = AccountTypes.ASSET_EX;
  }


  createAccount() {
    switch(this.accountType) {
      case AccountTypes.MONEY: {
        const value = this.configureAccountFormGroup.value;
        this.createAccountMoney(
          value.accountName!, 
          value.accountCurrency!);
        break;
      }
      case AccountTypes.ASSET_EX: {
        const value = this.configureAccountFormGroup.value;
        this.createAccountExAsset(+value.assetId!);
        break;
      }
    }
  }

  private createAccountMoney(name: string, currency: string) {
    let obs = this.backend.createAccountMoney(name, currency);
    obs.subscribe((result: any) => {
      const data = result.data;
    });
  }

  private createAccountExAsset(assetId: number) {
    let obs = this.backend.createAccountExAsset(assetId);
    obs.subscribe((result: any) => {
      const data = result.data;
    });
  }

  private fetchAssetsExchange() {
    let obs = this.backend.getExAssets();

    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.exAssets = data.assets as ExAsset[];
    });
  }
}
