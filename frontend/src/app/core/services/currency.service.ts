import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Currency } from '../data-types/currency';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencies: Currency[];

  constructor(private backend: BackendService) { 
  }

  fetchCurrencies(callback: Function) {
    let obs = this.backend.getCurriencies();
    obs.valueChanges.subscribe((results: any)=> {
      const currencies = results.data.currencies;
      callback(currencies as Currency[])
    });
  }

  fetchCurrenciesFav(callback: Function) {
    let obs = this.backend.getCurrienciesFav();
    obs.valueChanges.subscribe((results: any)=> {
      const currencies = results.data.currenciesFav;
      callback(currencies as Currency[])
    });
  }


}
