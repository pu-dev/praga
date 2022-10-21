import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'wallet-create-form',
  templateUrl: './wallet-create-form.component.html',
  styleUrls: [
    './wallet-create-form.component.css',
    '../../../../core/shared/globals.css'
  ]
})

export class WalletCreateFormComponent implements OnInit {
  walletFlowInput = new FormControl('', [
    Validators.required,
   ]);

  values: string;
  constructor(
    private toolbox: ToolboxService,
    private backend: BackendService,
    private snackbar: SnackbarService,
    private router : Router
   ) {}

  ngOnInit() {

  }

  onCreateWallet() {
    let walletName: string = this.walletFlowInput.value!;
    this.createWallet(walletName);
  }

  onKey(event: any) {
    if (event.key == 'Enter') {
      this.onCreateWallet();
    }
  }

  private createWallet(walletName: string) {
    let obs = this.backend.createWallet(walletName);
    obs.subscribe(
      (result: any)=> {
        const data = result.data;
        let url = this.router.url;

        this.toolbox.refresh();
      },
    );
  }
}
