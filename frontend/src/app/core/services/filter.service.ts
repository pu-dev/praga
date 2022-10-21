import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterMatchI<T>(dataSource: MatTableDataSource<T>, member: string) {
    if (dataSource == undefined) {
      return;
    }

    dataSource.filterPredicate = (data: T, filter: string): boolean => {
      const re = new RegExp(filter, 'i');
      let obj = this.getMember(data, member);
      return `${obj}`.match(re) != null;
    }    
  }

  filterMatchNumber<T>(dataSource: MatTableDataSource<T>, member: string, precision: number) {
    /* precision: parameter tells how many digits after
       decimal point should be taken into matching 
    */

    if (dataSource == undefined) {
      return;
    }

    dataSource.filterPredicate = (data: T, filter: string):boolean => {
      const re = new RegExp(filter);
      let obj = this.getMember(data, member);
      obj = obj.toFixed(precision);

      return `${obj}`.match(re) != null;
    }    
  }

  private getMember(data: any, member: string) {
    let members = member.split('.');
    let count = members.length;
    let out = data;

    for (let tmp of members) {
        out = out[tmp];
    }

    return out;
  }
}
