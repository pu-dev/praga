import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { BackendService } from '../../services/backend.service';
import { Asset }       from '../../data-types/asset';

enum State {
  UNINIT = 0,
  LOADING,
  LOADED
}

@Component({
  selector: 'asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['./asset-select.component.css']
})

export class AssetSelectComponent {
  @Output() assetSelected = new EventEmitter<Asset>();

  @Input()
  // get eid(): string { return this._eid; }
  set eid(eid: string) {
    this.fetchAssets(eid);
  }

  assetInput = new FormControl('', [
    Validators.required,
   ]);

  assets: Asset[] = [];
  state: State = State.UNINIT;

  constructor(
    private backend: BackendService
  ) {
    this.fetchAssets('');
  }

  isLoading() {
    return this.state == State.LOADING;
  }

  isLoaded() {
    return this.state == State.LOADED;
  }

  onSelectAsset(asset: Asset) {
    // let asset_name = `${asset.name}.${asset.exchange.eid}`;
    this.assetSelected.emit(asset);
  }

  private fetchAssets(eid: string) {
    if (eid.length == 0) {
      return;
    }

    this.state = State.LOADING;
    let obs = this.backend.getAssetsOnExchange(eid);
    obs.valueChanges.subscribe((result: any) => {
      let data = result.data;
      console.log(data);
      // this.exchanges = data.exchangesStock as Exchange[];
      this.assets = data.assetsOnExchange as Asset[];
      this.state = State.LOADED;
    });
  }
}

