import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { BackendService } from '../../services/backend.service';
import { Asset }          from '../../data-types/asset';

enum State {
  UNINIT = 0,
  LOADING,
  LOADED
}

@Component({
  selector: 'crypto-select',
  templateUrl: './crypto-select.component.html',
  styleUrls: [
    '../../shared/select-option.css',
    './crypto-select.component.css'
  ]
})

export class CryptoSelectComponent {
  @Output() cryptoSelected = new EventEmitter<Asset>();

  @Input()
  // get eid(): string { return this._eid; }
  set eid(eid: string) {
    // this.fetchAssets(eid);
  }

  assetInput = new FormControl('', [
    Validators.required,
   ]);

  assets: Asset[] = [];
  state: State = State.UNINIT;

  constructor(
    private backend: BackendService
  ) {
    this.fetchCrypto();
  }

  isLoading() {
    return this.state == State.LOADING;
  }

  isLoaded() {
    return this.state == State.LOADED;
  }

  onSelectAsset(asset: Asset) {
    this.cryptoSelected.emit(asset);
  }

  private fetchCrypto() {
    this.state = State.LOADING;
    let obs = this.backend.getAssetsOnExchange('CC');
    obs.valueChanges.subscribe((result: any) => {
      let data = result.data;
      this.assets = data.assetsOnExchange as Asset[];
      this.state = State.LOADED;
    });
  }
}

