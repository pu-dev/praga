import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './user-login.component.css'
  ]
})

export class UserLoginComponent {
  hidePassword = true;

  emailForm = new FormControl('demo', [Validators.required, Validators.email]);
  passwordForm = new FormControl('demo', [Validators.required]);

  constructor(
    private auth: AuthService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService
  ) {}

  onLogin(): void {
    if ( ! this.isInputValid() ) {
      return;
    }    
    this.auth.login(this.emailForm.value!, this.passwordForm.value!, 'account');
  }

  onKeyUp(event: KeyboardEvent) {
    if ( this.toolbox.checkEnterPressed(event) ) {
      this.onLogin();
    }
  }

  private isInputValid(): boolean {
    if (this.emailForm.value == null || this.emailForm.value!.trim() == "") {
      this.snackbar.show("Enter valid email address (any string for now ;) )")
      return false;
    }

    if (this.passwordForm.value == null || this.passwordForm.value! == "") {
      this.snackbar.show("Enter password")
      return false;
    }

    return true;
  }
}
