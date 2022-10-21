import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { BackendService } from '../../services/backend.service';
import { Exchange }       from '../../data-types/exchange';

@Component({
  selector: 'exchange-select',
  templateUrl: './exchange-select.component.html',
  styleUrls: [
    '../../shared/select-option.css',
    './exchange-select.component.css'
  ]
})



export class ExchangeSelectComponent {
  @Output() exchangeSelected = new EventEmitter<Exchange>();

  exInput = new FormControl('', [
    Validators.required,
   ]);

  exchanges: Exchange[] = [];

  constructor(
    private backend: BackendService
  ) {
    this.fetchExchanges();
  }

  onSelectExchange(ex: Exchange) {
    this.exchangeSelected.emit(ex);
  }

  private fetchExchanges() {
    let obs = this.backend.getExchangesStock();
    obs.valueChanges.subscribe((result: any) => {
      let data = result.data;
      this.exchanges = data.exchangesStock as Exchange[];
      console.log(this.exchanges)
    });
  }
}
