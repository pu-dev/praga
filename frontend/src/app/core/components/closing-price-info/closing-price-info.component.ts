import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

import { BackendService } from '../../services/backend.service';
import { ToolboxService } from '../../services/toolbox.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AssetPrice } from '../../data-types/asset-price';



export enum LoadingState {
  HIDDEN,
  LOADING,
  LOADED
};

@Component({
  selector: 'closing-price-info',
  templateUrl: './closing-price-info.component.html',
  styleUrls: ['./closing-price-info.component.css']
})

export class ClosingPriceInfoComponent {
  @Output() priceUpdate = new EventEmitter<AssetPrice>();

  @Input()
  set date(date: string) {
    this._date = date;
    this.fetchAssetPrice(this._assetName, this._eid, this._date);
  }
  get date(): string {
    return this._date;
  }

  @Input()
  set asset(asset: string) {
    let tmp = asset.split('.');
    this._assetName = tmp[0];
    this._eid = tmp[1];
    this.fetchAssetPrice(this._assetName, this._eid, this._date);
  }

  private _date: string;
  private _eid: string;
  private _assetName: string;
  private _loadingState: LoadingState = LoadingState.HIDDEN;

  assetPrice: AssetPrice;

  closingPriceInput = new FormControl({value: '', disabled: true})

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService,
  ) {}
  
  isLoading(): boolean {
    return this._loadingState == LoadingState.LOADING;
  }

  getDateFormatted() {
    return this.toolbox.dateYYYYMMDDtoISO(this.date);
  }

  private fetchAssetPrice(assetName: string, eid: string, date: string) {
    if (assetName == undefined) return;
    if (eid == undefined) return;
    if (date == undefined) return;
    
    if (assetName.length == 0) return;
    if (eid.length == 0) return;
    if (date.length == 0) return;

    let obs = this.backend.getAssetPrice(assetName, eid, date);
    this._loadingState = LoadingState.LOADING;

    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      if (data.eod == null) {
        console.warn("Fix me");
        return;
      }
      this.assetPrice = data.eod as AssetPrice;

      let priceTmp = this.toolbox.numberWithCommas(this.assetPrice.priceClose, 2);
      this.closingPriceInput.setValue(priceTmp);

      this._loadingState = LoadingState.LOADED;
      this.priceUpdate.emit(this.assetPrice);
    });
  }
}
