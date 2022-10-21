import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { BackendService } from '../../../../core/services/backend.service';
import { ToolboxService } from '../../../../core/services/toolbox.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';


@Component({
  selector: 'user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: [
    '../../../../core/shared/globals.css',
    './user-signup.component.css'
  ]
})
export class UserSignupComponent  {
  username: string;
  hidePassword = true;
  hidePasswordAgain = true;

  emailForm = new FormControl('', [Validators.required]);
  passwordForm = new FormControl('', [Validators.required]);
  passwordAgainForm = new FormControl('', [Validators.required]);

  constructor(
    private auth: AuthService,
    private backend: BackendService,
    private toolbox: ToolboxService,
    private snackbar: SnackbarService
  ) { }

  onCreateUser() {
    if ( ! this.isInputValid() ) {
      return;
    }
    
    let username = this.emailForm.value!;
    let password = this.passwordForm.value!;

    let obs = this.backend.createUser(username, password);

    obs.subscribe((result: any) => {
      this.auth.login(username!, password!, 'account');
    });
  }

  onKeyUp(event: KeyboardEvent): void {
    if ( this.toolbox.checkEnterPressed(event) ) {
        this.onCreateUser();
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

    if (this.passwordAgainForm.value == null || this.passwordAgainForm.value! == "") {
      this.snackbar.show("Write password again")
      return false;
    }

    if (this.passwordForm.value != null && this.passwordForm.value != this.passwordAgainForm.value) {
      this.snackbar.show("Passwords don't match")
      return false;
    }

    return true;
  }
}
