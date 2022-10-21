import { fromEvent } from 'rxjs';
import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatChipInputEvent } from '@angular/material/chips';

import { Account } from '../../data-types/account';
import { Wallet } from '../../data-types/wallet';

import { BackendService } from '../../services/backend.service';
import { ToolboxService } from '../../services/toolbox.service';
import { OutputService } from '../../services/output.service';



@Component({
  selector: 'account-select-chips',
  templateUrl: './account-select-chips.component.html',
  styleUrls: [
    '../../shared/globals.css',
    './account-select-chips.component.css'
  ]
})

export class AccountSelectChipsComponent implements OnInit {
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

  accountsAll: Account[] = [];
  wallet: Wallet;
  walletAccounts: Account[] = [];

  mouseX: string = "0";
  mouseY: string = "0";

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
    public  output: OutputService
  ) {
  }

  ngOnInit(): void {
    this.fetchAccounts();
    this.fetchWallet(this._walletId);

    const clicks = fromEvent(document, 'click');
    clicks.subscribe(click => {
      let c = click as PointerEvent;
      this.mouseX = `${c.clientX}px`;
      this.mouseY = `${c.clientY}px`;
    });
  }

  onClickOpenMenu() {
    setTimeout(()=> {
      this.trigger.openMenu();
    }, 50);
  }

  onAddAccount(account: Account) {
    this.walletAccounts.push(account);
    this.udpateRemoteWallet();
  }

  onRemoveAccount(account: Account): void {
    const index = this.walletAccounts.indexOf(account);
    if (index >= 0) {
      this.walletAccounts.splice(index, 1);
      this.udpateRemoteWallet();
    }
  }

  getRemainingAccounts() {
    let ids: number[] = [];

    for (let acc of this.walletAccounts) {
      ids.push(+acc.id);
    }

    let accounts: Account[] = [];
    for (let acc of this.accountsAll) {
      if ( ! ids.includes(+acc.id) ) {
        accounts.push(acc);
      }
    }

    return accounts;
  }

  canAdd() {
    return this.getRemainingAccounts().length == 0;
  }

  private fetchAccounts() {
    let obs = this.backend.getAccounts();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.accountsAll = data.accounts as Account[];
    });
  }

  private fetchWallet(wallet_id: number) {
    if (wallet_id < 0) {
      return;
    }
    let obs = this.backend.getWallet(wallet_id);
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.wallet = data.wallet as Wallet;
      this.updateWalletAccounts();
    });
  }

  private udpateRemoteWallet() {
    let accsIds: number[] = [];
    for (let acc of this.walletAccounts) {
      accsIds.push(acc.id);
    }

    let obs = this.backend.updateWallet(
      this.wallet.id, 
      accsIds
    );
    obs.subscribe((result: any) => {
      const data = result.data;
    });
  }

  private updateWalletAccounts() {
    this.walletAccounts = []; 
    for (let acc of this.wallet.accounts) {
      this.walletAccounts.push(acc);
    }
  }
}



