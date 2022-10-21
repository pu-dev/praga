import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor() {}

  shortenText(txt: string, maxLen: number): string {
    if (txt.length <= maxLen) {
      return txt;
    }

    let ret: string = "";
    let tmp = txt.slice(0, maxLen-3);
    ret = `${tmp}...`;

    return ret;
  }
}
