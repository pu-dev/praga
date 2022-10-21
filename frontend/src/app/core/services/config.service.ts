import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configLocal = {
    apiUrl: 'http://localhost:7000/content'
  };

  private configProd = {
    apiUrl: 'https://praga-be.codeblock.it/content'
  };

  constructor() {
  }

  getConfig() {
    return this.configLocal;
  }
}
