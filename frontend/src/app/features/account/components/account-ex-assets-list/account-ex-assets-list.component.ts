import { Component } from '@angular/core';
import { BackendService } from '../../../../core/services/backend.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { AccountExAsset } from '../../../../core/data-types/account-ex-asset';

@Component({
  selector: 'account-ex-assets-list',
  templateUrl: './account-ex-assets-list.component.html',
  styleUrls: ['./account-ex-assets-list.component.css']
})

export class AccountExAssetsListComponent {
  accountsExAsset: AccountExAsset[];
  accountDisplayedColumns: string[] = [
    'controls',
    'idx', 
    'account-asset-name',
    'account-asset-fullname'
  ];

  constructor(
    private backend: BackendService,
    private snackbar: SnackbarService,
    private toolbox: ToolboxService
  ) {
    this.fetchAccountsExAsset();
  }
  
  onDeleteAccount(id: number) {
    let obs = this.backend.deleteAccountExAsset(id);
    obs.subscribe((result: any) => {
      const data = result.data;
      this.snackbar.show(`Account deleted`);
      this.toolbox.refresh();
    });
  }

  private fetchAccountsExAsset() {
    let obs = this.backend.getAccountsExAsset();
    obs.valueChanges.subscribe((result: any) => {
      const data = result.data;
      this.accountsExAsset = data.accountsAssetExchange as AccountExAsset[];
    });
  }
}
