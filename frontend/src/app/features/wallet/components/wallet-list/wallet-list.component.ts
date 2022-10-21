import { Component } from '@angular/core';
import { BackendService } from '../../../../core/services/backend.service';
import { Operation } from '../../../../core/data-types/operation';
import { AccountMoney } from '../../../../core/data-types/account-money';
import { AccountExAsset } from '../../../../core/data-types/account-ex-asset';
import { AccountTypes } from '../../../../core/data-types/account-types';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { fromEvent } from 'rxjs';


import {Directive, Input, ViewChild} from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';


export interface Fruit {
  name: string;
}

@Component({
  selector: 'wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})

export class WalletListComponent {

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  operations: Operation[];
  operationsDisplayedColumns: string[] = [
    'idx', 
    'op-account-name', 
    'op-account-type', 
    'op-date', 
    'op-qty-change', 
    'op-cashflow', 
  ];


  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];
  bong:boolean;

  onClickAddAccount() {
    setTimeout(()=> {
      this.trigger.openMenu();
    }, 100);
    // this.fruits.push({name: "cipa"});
  }

  addAccount(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeAccount(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

x:string = "0";
y:string = "0";

  constructor(
    private backend: BackendService,
  ) {
    this.fetchAccountsMoney();

const clicks = fromEvent(document, 'click');
clicks.subscribe(click => {
  console.log(click)
  let c = click as PointerEvent;
  this.x = `${c.clientX}px`;
  this.y = `${c.clientY}px`;
this.bong =false
  // this.x = `0px`;
  // this.y = `0px`;
  // 
});

  }
  
  getAccountName(idx: number): string {
    let op = this.operations[idx];

    // if (op.accountType == AccountTypes[AccountTypes.MONEY]) {
    //   let account = op.accountMoney as AccountMoney;
    //   return account.name;
    // }

    // if (op.accountType == AccountTypes[AccountTypes.ASSET_EX]) {
    //   let account = op.accountExAsset as AccountExAsset;
    //   return account.asset.globalname;
    // }

    return "Unknown";
  }

  getAccountType(idx: number): string {
    return ""
    // let op = this.operations[idx];
    // return op.accountType;
  }

  private fetchAccountsMoney() {
    let obs = this.backend.getOperations();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      // console.log(data.operations)
      this.operations = data.operations as Operation[];
    });
  }
}



