import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { Wallet }     from '../../../../core/data-types/wallet';
import { XirrWallet } from '../../../../core/data-types/xirr-wallet';
import { CurrencyCode } from '../../../../core/data-types/currency';


enum CalcState {
  Uninitialized=0,
  Loading,
  Loaded
};

@Component({
  selector: 'fintech-asset-ex-list',
  templateUrl: './fintech-asset-ex-list.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './fintech-asset-ex-list.component.css',
  ]
})

export class FintechAssetExComponent {
  wallets: Wallet[];
  xirrWallets: XirrWallet[];

  transDateOldInput = new FormControl('', [
    Validators.required
  ]);
  transDateNewInput = new FormControl('', [
    Validators.required
  ]);

  calcState: CalcState = CalcState.Uninitialized;

  private startDate: string;
  private stopDate: string;
  private currency: string = 'USD';
  public  autoStopDate: string;

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService
  ) {
    this.wallets = [];
    this.xirrWallets = [];
    this.fetchWallets();
    // this.fetchXirrWallets();
  }
  
  getXirr(walletId: number): number {
    if (! this.xirrWallets ) {
      return 0;
    }

    for (let data of this.xirrWallets) {
      if (+data.walletId == walletId) {
        return data.xirr;
      }
    }

    return 0;
  }

  onSelectOldDate(date: string) {
    let startDate = this.toolbox.str2date(date);
    let stopDate  = this.toolbox.str2date(date);
    stopDate.add(1, "years");
    stopDate.add(-1, "day");


    this.startDate    = startDate.format("YYYYMMDD");
    this.stopDate     = stopDate.format("YYYYMMDD");
    this.autoStopDate = stopDate.format("YYYY-MM-DD");

    this.calculateXirr();
  }

  onSelectNewDate(date: string) {
    let stopDate  = this.toolbox.str2date(date);
    this.autoStopDate = stopDate.format("YYYY-MM-DD");

    this.calculateXirr();
  }
  
  onSelectCurrency(currency: CurrencyCode) {
    this.currency = currency.code;
    this.calculateXirr();
  }

  isCalculating() {
    return this.calcState == CalcState.Loading;
  }

  isCalcloaded() {
    return this.calcState == CalcState.Loaded;
  }

  private calculateXirr() {
    if (this.startDate == undefined) {
      return
    }

    if (this.stopDate == undefined) {
      return
    }

    this.fetchXirrWallets(this.startDate, this.stopDate);
  }

  private fetchWallets() {
    let obs = this.backend.getWallets();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;

      this.wallets = data.wallets as Wallet[];
    });
  }

  private fetchXirrWallets(dateOld: string, dateNew: string) {
    this.calcState = CalcState.Loading;

    let obs = this.backend.getXirrWallets(dateOld, dateNew, this.currency);
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.xirrWallets = data.xirrWallets as XirrWallet[];
      this.calcState = CalcState.Loaded;
    });
  }
}
