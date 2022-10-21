import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { BackendService } from '../../../../core/services/backend.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { FilterService }   from '../../../../core/services/filter.service';

import { Account } from '../../../../core/data-types/account';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: [
    '../../../../core/shared/table-compact.css',
    '../../../../core/shared/table-compact__min.css',
    '../../../../core/shared/table-compact__in_range.css',
    '../../../../core/shared/table-compact__max.css',
    './account-list.component.css',
   ]
})

export class AccountListComponent {
  accounts: Account[];
  accountDisplayedColumns: string[] = [
    'filler-front',
    'controls',
    'idx', 
    'account-name', 
    'account-type', 
    'currency',
    'filler-back'
  ];

  displayedHeaders: string[] = [
    'filler-front', 
    'controls', 
    'idx', 
    'filter-acc-name', 
    'filter-acc-type', 
    'filter-currency',
    'filler-back'   
  ];

  dataSource: MatTableDataSource<Account>;

  constructor(
    private backend: BackendService,
    private filters: FilterService,
    private snackbar: SnackbarService,
    private toolbox: ToolboxService
  ) {
    this.fetchAccountsMoney();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  selectFilterAccName() {
    return this.filters.filterMatchI(this.dataSource, 'name');
  }

  selectFilterAccType() {
    return this.filters.filterMatchI(this.dataSource, 'type');
  }

  selectFilterCurrency() {
    return this.filters.filterMatchI(this.dataSource, 'currency');
  }

  onDeleteAccount(id: number) {
    let obs = this.backend.deleteAccount(id);
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Account deleted`);
      this.toolbox.refresh();
    });
  }

  private fetchAccountsMoney() {
    let obs = this.backend.getAccounts();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.accounts = data.accounts as Account[];
      this.dataSource = new MatTableDataSource(this.accounts);      
    });
  }
}
