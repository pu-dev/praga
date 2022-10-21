import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  constructor(
    private router: Router
  ) { }

  checkEnterPressed(event: KeyboardEvent): boolean {
    if ( ! event ) {
      return false;
    }

    if ( ! event.key ) {
      return false;
    }

    return event.key.toLowerCase() == "enter" ;
  }


  isNumber(value: any): boolean {
    if (value == null) {
      return false;
    }

    if (value.length == 0) {
      return false;
    }

    if (isNaN(+value)) {
      return false;
    }

    return true;
  }

  isDate(value: any): boolean {
    const date = moment(value).format("YYYYMMDD");
    if (date == 'Invalid date') {
      return false;
    }
    return true;
  }

  str2date(dateTxt: string): any {
    return moment(dateTxt);
  }

  weirdDate2date(dateTxt: string): any {
    return moment(dateTxt);
  }

  weirdDate2string(dateTxt: string): string {
    return moment(dateTxt).format("YYYYMMDD");
  }

  date2string(dateTxt: string): string {
    return this.weirdDate2string(dateTxt);
  }

  dateYYYYMMDDtoISO(dateTxt: string): string {
    return `${dateTxt.substr(0, 4)}-${dateTxt.substr(4, 2)}-${dateTxt.substr(6, 2)}`
  }

  refresh(){
    let url = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.router.navigate([url]));
  }


  numberWithCommas(value: string | number, decimalPlaces: number): string {
    let tmp = value.toString().split('.');
    let main = tmp[0];
    main = main.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let fraction = "00";
    if (tmp.length == 2 ) {
      fraction = tmp[1];
    }
    fraction = fraction.substr(0, decimalPlaces);
    
    return `${main}.${fraction}`;
  }
}
