import { NgModule } from '@angular/core';
import { WalletRoutingModule } from './wallet-routing.module';
import { SharedModule } from '../../core/shared/shared.module';

import { WalletListComponent } from './components/wallet-list/wallet-list.component';
import { WalletEditFormComponent } from './components/wallet-edit-form/wallet-edit-form.component';
import { WalletCreateFormComponent } from './components/wallet-create-form/wallet-create-form.component';

import { ViewWalletListComponent } from './views/view-wallet-list/view-wallet-list.component';
import { ViewWalletEditComponent } from './views/view-wallet-edit/view-wallet-edit.component';

import { AccountSelectChipsComponent } from '../../core/components/account-select-chips/account-select-chips.component';

@NgModule({
declarations: [
    WalletListComponent,
    WalletEditFormComponent,
    WalletCreateFormComponent,

    AccountSelectChipsComponent,
    
    ViewWalletListComponent,
    ViewWalletEditComponent,
  ],
  imports: [
    WalletRoutingModule,
    SharedModule,
  ],
  exports: [
    ViewWalletEditComponent,
  ],
})
export class WalletModule { }
