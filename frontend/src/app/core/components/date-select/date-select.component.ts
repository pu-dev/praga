import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

import { BackendService } from '../../services/backend.service';
import { ToolboxService } from '../../services/toolbox.service';



@Component({
  selector: 'date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.css']
})

export class DateSelectComponent {
  @Input() title: string;
  @Input() label: string = "Choose a date";
  @Input() width: string = "auto";

  @Input() 
  set date(date: string) {
    this.dateInput.setValue(date);
  }

  @Output() dateSelected = new EventEmitter<string>();

  dateInput = new FormControl({
    value: '',
    disabled: false
  });

  constructor(
    private backend: BackendService,
    private toolbox: ToolboxService,
  ) {}
  
  onSelectDate(date: MatDatepickerInputEvent<Date>) {
    let dateTmp = this.toolbox.date2string(`${date.value}`)
    let valid = ( dateTmp.match(/^[0-9]{8}$/) != null);
    if ( valid ) {
      this.dateSelected.emit(dateTmp);
    }
  }
}
