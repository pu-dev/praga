import { fromEvent } from 'rxjs';
import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatChipInputEvent } from '@angular/material/chips';
import { AccountExAsset } from '../../../../core/data-types/account-ex-asset';
import { AccountMoney } from '../../../../core/data-types/account-money';
import { AccountBase } from '../../../../core/data-types/account-base';
import { Wallet } from '../../../../core/data-types/wallet';
import { AccountTypes } from '../../../../core/data-types/account-types';
import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';


@Component({
  selector: 'wallet-edit-form',
  templateUrl: './wallet-edit-form.component.html',
  styleUrls: ['./wallet-edit-form.component.css']
})

export class WalletEditFormComponent implements OnInit {
  @Input()
    get walletId(): string { return `${this._walletId}`; }
    set walletId(walletId: string) {
      if ( ! this.toolbox.isNumber(walletId)) {
        return;
      }

      this._walletId = +walletId;
      this.fetchWallet(this._walletId);
    }
  private _walletId: number;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  wallet: Wallet;

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService
  ) {
    this.wallet = {
      id: -1, 
      name:"", 
      accounts: [], 
    };
  }

  ngOnInit(): void {
  }

  onDeleteWallet(wallet_id: number) {
    this.deleteWallet(wallet_id);
  }

  private fetchWallet(wallet_id: number) {
    let obs = this.backend.getWallet(wallet_id);
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.wallet = data.wallet as Wallet;
    });
  }

  private deleteWallet(wallet_id: number) {
    let obs = this.backend.deleteWallet(wallet_id);
    obs.subscribe((result: any) => {
      const data = result.data;
      this.toolbox.refresh();
    })
  }
}



