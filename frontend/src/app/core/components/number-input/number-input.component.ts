import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

import { BackendService } from '../../services/backend.service';
import { ToolboxService } from '../../services/toolbox.service';


@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})

export class NumberInputComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<number>();

  @Input() label: string;

  @Input() alwaysNegative: boolean = false;

  @Input() alwaysPositive: boolean = false;

  @Input() 
  set value(v: number) {
    v = this.applyModifiers(v);
    this.valueInput.setValue(`${v}`);
  }

  valueInput = new FormControl('', [
    Validators.required
   ]);

  constructor(private toolbox: ToolboxService) {}

  ngOnInit() {
    // this.value = 0; 
  }

  onChangeValue() {
    if ( ! this.toolbox.isNumber(this.valueInput.value) ) {
      return;
    }

    let value = +this.valueInput.value!;
    this.valueChanged.emit(value);
  }

  private applyModifiers(value: number): number {
    if ( this.alwaysPositive ) {
      if ( value < 0 ) {
        return -value;
      }
    }

    if ( this.alwaysNegative ) {
      if ( value > 0 ) {
        return -value;
      }
    }

    return value;
  }

}
