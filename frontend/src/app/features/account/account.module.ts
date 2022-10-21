import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../core/shared/shared.module';

import { AccountCreateFormComponent }      from './components/account-create-form/account-create-form.component';
import { AccountCreateFormMenuComponent }  from './components/account-create-form/account-create-form-menu.component';

import { AccountMoneyCreateFormComponent } from './components/account-create-form/account-money-create-form.component';
import { AccountStockCreateFormComponent } from './components/account-create-form/account-stock-create-form.component';
import { AccountCryptoCreateFormComponent } from './components/account-create-form/account-crypto-create-form.component';
import { AccountUserCreateFormComponent } from './components/account-create-form/account-user-create-form.component';

import { AccountListComponent }    from './components/account-list/account-list.component';

import { ViewAccountCreateComponent } from './views/view-account-create/view-account-create.component';
import { ViewAccountListComponent }   from './views/view-account-list/view-account-list.component';

import { CurrencySelectComponent }  from '../../core/components/currency-select/currency-select.component';
import { AccountNameFormComponent } from '../../core/components/account-name-form/account-name-form.component';
import { ExchangeSelectComponent }  from '../../core/components/exchange-select/exchange-select.component';
import { AssetSelectComponent }     from '../../core/components/asset-select/asset-select.component';
import { CryptoSelectComponent }    from '../../core/components/crypto-select/crypto-select.component';

import { TemplatePageComponent }    from '../../core/components/template-page/template-page.component';


@NgModule({
  declarations: [
    AccountNameFormComponent,
    ExchangeSelectComponent,
    AssetSelectComponent,
    CryptoSelectComponent,

    AccountCreateFormComponent,
    AccountCreateFormMenuComponent,

    AccountMoneyCreateFormComponent,
    AccountStockCreateFormComponent,
    AccountCryptoCreateFormComponent,
    AccountUserCreateFormComponent,

    AccountListComponent,

    ViewAccountCreateComponent,
    ViewAccountListComponent
  ],
  imports: [
    AccountRoutingModule,
    SharedModule

  ],
  exports: [
  ]
})

export class AccountModule { }
