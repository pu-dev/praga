import { Component } from '@angular/core';
import { Wallet } from '../../../../core/data-types/wallet';
import { BackendService } from '../../../../core/services/backend.service';


@Component({
  selector: 'view-wallet-edit',
  templateUrl: './view-wallet-edit.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './view-wallet-edit.component.css'
  ]
})
export class ViewWalletEditComponent {
  wallets: Wallet[];
  showCreateWallet: boolean = false;

  constructor(private backend: BackendService) {
    this.fetchWallets();
    this.wallets = [];
  }

  showCreateWalletForm() {
    this.showCreateWallet = true;
  }

  private fetchWallets() {
    let obs = this.backend.getWallets();
    obs.valueChanges.subscribe((result:any) => {
      const data = result.data;
      this.wallets = data.wallets as Wallet[];
      console.log(this.wallets)
    });
  }
}
