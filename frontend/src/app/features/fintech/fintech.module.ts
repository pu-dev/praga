import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../core/shared/shared.module';
import { FintechRoutingModule } from './fintech-routing.module';

import { WalletModule } from '../wallet/wallet.module';


import { FintechAssetExComponent } from './components/fintech-asset-ex-list/fintech-asset-ex-list.component';

import { ViewFintechPlayComponent } from './views/view-fintech-play/view-fintech-play.component';


@NgModule({
declarations: [
    FintechAssetExComponent,

    ViewFintechPlayComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    FintechRoutingModule,
    WalletModule,
  ]
})
export class FintechModule { }
