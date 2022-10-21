import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

import { BackendService } from '../../services/backend.service';
import { ToolboxService } from '../../services/toolbox.service';

enum State {
  UNINIT = 0,
  LOADING,
  LOADED
};

@Component({
  selector: 'currency-rate-info',
  templateUrl: './currency-rate-info.component.html',
  styleUrls: ['./currency-rate-info.component.css']
})

export class CurrencyRateInfoComponent {
  @Output() currencyRateUpdated = new EventEmitter<number>();

  @Input() 
  set currencySrcLabel(curr: string) {
    this._currencySrc = curr;
    this.fetchCurrencyRate();
  }
  get currencySrcLabel(): string {
    return this._currencySrc;
  }

  @Input() 
  set currencyDstLabel(curr: string) {
    this._currencyDst = curr;
    this.fetchCurrencyRate();
  }
  get currencyDstLabel(): string {
    return this._currencyDst;
  }

  @Input() date: string;
  
  private _currencySrc: string;
  private _currencyDst: string;
  private _state: State = State.UNINIT;

  currencyRate: number;

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService
  ) {
  }

  getDate(): string {
    return this.toolbox.dateYYYYMMDDtoISO(this.date);
  }

  isLoaded(): boolean {
    return this._state == State.LOADED;
  }
  
  isLoading(): boolean {
    return this._state == State.LOADING;
  }
  
  private fetchCurrencyRate() {
    // console.log("Fetch currency rate");

    if (this.currencySrcLabel == undefined) {
      // console.log("Fetch currency rate, currencySrcLabel problem");
      return;
    } 
    if (this.currencyDstLabel == undefined) {
      // console.log("Fetch currency rate, currencyDstLabel problem");
      return;
    } 
    if (this.date == undefined) {
      // console.log("Fetch currency rate, date problem");
      return;
    } 

    let obs = this.backend.getCurrencyRate(
      this.currencySrcLabel,
      this.currencyDstLabel,
      this.date
    );

    this._state = State.LOADING;

    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.currencyRate = data.currencyRate as number;
      this._state = State.LOADED;

      this.emitRate();
    });
  }

  private emitRate() {
    this.currencyRateUpdated.emit(this.currencyRate);
  }
}
