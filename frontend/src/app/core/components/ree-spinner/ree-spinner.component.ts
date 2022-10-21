import { Component } from '@angular/core';
import { Input } from '@angular/core';


@Component({
  selector: 'ree-spinner',
  templateUrl: './ree-spinner.component.html',
  styleUrls: ['./ree-spinner.component.css']
})

export class ReeSpinnerComponent {
  @Input() color: string ='grey';
  @Input() diameter: number = 30;
}
