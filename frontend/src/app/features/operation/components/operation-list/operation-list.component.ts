import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MediaMatcher } from '@angular/cdk/layout';

import { BackendService }  from '../../../../core/services/backend.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ToolboxService }  from '../../../../core/services/toolbox.service';
import { FilterService }   from '../../../../core/services/filter.service';
import { OutputService }   from '../../../../core/services/output.service';

import { Operation }   from '../../../../core/data-types/operation';
import { Transaction } from '../../../../core/data-types/transaction';


interface LooseObject {
  [key: string]: any
}


@Component({
  selector: 'operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: [
    '../../../../core/shared/table-compact.css',
    '../../../../core/shared/table-compact__min.css',
    '../../../../core/shared/table-compact__in_range.css',
    '../../../../core/shared/table-compact__max.css',
    '../../../../core/shared/globals.css',
    './operation-list.component.css',
  ]
})

export class OperationListComponent implements OnInit {
  displayedColumns: string[] = [];

  displayedHeaders: string[] = [];

  dataSource: MatTableDataSource<Operation>;

  operations:  Operation[];
  transactions: Transaction[];
  opsTransIds: number[] = []; // Used to store operations ids which
                              // are part of transactions

  op2tranMatcher: LooseObject = {};


  constructor(
    private backend: BackendService,
    private filters: FilterService,
    private snackbar: SnackbarService,
    private toolbox: ToolboxService,
    public media: MediaMatcher,
    public output: OutputService,
  ) {
    this.fetchOperations();
    this.fetchTransactions();

  }

  ngOnInit() {
    this.mediaUpdate();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteOperation(opId: number) {
    this.deleteOperation(opId);
  }

  onDeleteTransaction(op: Operation) {
    if (op.id in this.op2tranMatcher) {
      let transId = this.op2tranMatcher[op.id];
      this.deleteTransaction(transId);
    }
  }

  selectFilterAccName() {
    return this.filters.filterMatchI(this.dataSource, 'account.name');
  }

  selectFilterAccType() {
    return this.filters.filterMatchI(this.dataSource, 'account.type');
  }

  selectFilterDate() {
    return this.filters.filterMatchI(this.dataSource, 'dateTxt');
  }

  selectFilterCashflow() {
    return this.filters.filterMatchNumber(this.dataSource, 'cashflow', 2);
  }

  selectFilterQtyChange() {
    return this.filters.filterMatchNumber(this.dataSource, 'qtyChange', 2);
  }

  isTransaction(op: Operation): boolean {
    if (this.opsTransIds == undefined) {
      return false;
    }

    return this.opsTransIds.indexOf(+op.id) >= 0;
  }

  getAccountName(op: Operation): string {
    let name = op.account.name;
      return this.output.shortenText(name, 15);

    if (this.media.matchMedia('(max-width: 360px)').matches) {
      return this.output.shortenText(name, 15);
    }

    if (this.media.matchMedia('(max-width: 420px)').matches) {
      return this.output.shortenText(name, 17);
    }

    if (this.media.matchMedia('(max-width: 480px)').matches) {
      return this.output.shortenText(name, 17);
    }

    if (this.media.matchMedia('(max-width: 480px)').matches) {
      return this.output.shortenText(name, 17);
    }

    return name;
  }

  getCurrency(op: Operation): string {
    let match = this.media.matchMedia('(max-width: 420px)').matches;
    return match ? "" : op.account.currency;
  }

  private updateOperationsTrans() {
    this.opsTransIds = [];

    this.op2tranMatcher = {};

    for (let tr of this.transactions) {
      this.opsTransIds.push(+tr.creditOp.id);
      this.opsTransIds.push(+tr.debitOp.id);

      let transId = `${tr.id}`;
      let cId = `${tr.creditOp.id}`;
      let dId = `${tr.debitOp.id}`;

      this.op2tranMatcher[cId] = transId;
      this.op2tranMatcher[dId] = transId;
    }
  }

  private deleteOperation(opId: number) {
    let obs = this.backend.deleteOperation(opId);
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Operation deleted`);
      this.toolbox.refresh();
    });
  }

  private deleteTransaction(transId: number) {
    let obs = this.backend.deleteTransaction(transId);
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Transaction broken`);
      this.toolbox.refresh();
    });
  }

  private mediaUpdate() {
    if (this.media.matchMedia('(max-width: 400px)').matches) {
      this.setForMin();
      return;
    }

    if (this.media.matchMedia('(max-width: 700px)').matches) {
      this.setForInRange();
      return;
    }

    this.setForMax();
  }

  private fetchOperations() {
    let obs = this.backend.getOperations();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.operations = data.operations as Operation[];
      this.dataSource = new MatTableDataSource(this.operations);
    });
  }

  private fetchTransactions() {
    let obs = this.backend.getTransactions();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.transactions = data.transactions as Transaction[];
      this.updateOperationsTrans();
    });
  }

  private setForMin() {
    this.displayedColumns = [
      'filler-front',
      'controls',
      'date',
      'account-name', 
      'qty-change', 
      'cashflow', 
      'filler-back'
    ];

    this.displayedHeaders = [
      'filler-front', 
      'controls', 
      'filter-date',
      'filter-acc-name', 
      'filter-qty-change', 
      'filter-cashflow',     
      'filler-back'   
    ];
  }

  private setForInRange() {
    this.displayedColumns = [
      'filler-front',
      'controls',
      'date',
      'account-name', 
      'account-type', 
      'qty-change', 
      'cashflow', 
      'filler-back'
    ];

    this.displayedHeaders = [
      'filler-front', 
      'controls', 
      'filter-date',
      'filter-acc-name', 
      'filter-acc-type', 
      'filter-qty-change', 
      'filter-cashflow',     
      'filler-back'   
    ];
  }

  private setForMax() {
    this.displayedColumns = [
      'filler-front',
      'controls',
      'idx',
      'date',
      'account-name', 
      'account-type', 
      'qty-change', 
      'cashflow', 
      'filler-back'
    ];

    this.displayedHeaders = [
      'filler-front', 
      'controls', 
      'idx', 
      'filter-date',
      'filter-acc-name', 
      'filter-acc-type', 
      'filter-qty-change', 
      'filter-cashflow',     
      'filler-back'   
    ];
  }

}
