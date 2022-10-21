import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { BackendService }  from '../../services/backend.service';

@Component({
  selector: 'account-name-form',
  templateUrl: './account-name-form.component.html',
  styleUrls: ['./account-name-form.component.css']
})


export class AccountNameFormComponent {
  @Output() accountNameEvent = new EventEmitter<string>();
  @Input() 
  set name(name: string) {
    this.accountNameInput.setValue(name);
  }

  accountNameInput = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  // currencyInput = new FormControl('', [
  //   Validators.required,
  //  ]);

  constructor() {
  }

  onChange(event: any) {
    this.accountNameEvent.emit(event);
  }
}
