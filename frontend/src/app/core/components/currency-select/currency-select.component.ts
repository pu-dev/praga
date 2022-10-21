import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { BackendService }  from '../../services/backend.service';
import { Currency }        from '../../data-types/currency';
import { CurrencyCode }    from '../../data-types/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: [
    '../../shared/select-option.css',
    './currency-select.component.css'
  ]
})



export class CurrencySelectComponent {
  @Output() currencyEvent = new EventEmitter<CurrencyCode>();
  @Input() 
  set currency(currency: string) {
    this.currencyInput.setValue(currency);
  }
  @Input() 
  set disabled(_: string) {
    this.currencyInput.disable();
  }

  currencyInput = new FormControl('', [
    Validators.required,
   ]);

  currencies: Currency[] = [];
  currenciesFav: Currency[] = [];
  selectedCurrency: Currency;

  constructor(
    private currencyServ: CurrencyService,
    ) 
  {
    this.currencyServ.fetchCurrencies((currencies: any) => { 
      this.currencies = currencies;
    });

    this.currencyServ.fetchCurrenciesFav((currencies: any) => { 
      console.log(currencies)
      this.currenciesFav = currencies;
    });

  }

  onSelectCurrency(currency: string) {
    let cur = {code: currency} as CurrencyCode;
    this.currencyEvent.emit(cur);
  }
}
