import { Component, Input } from '@angular/core';

@Component({
  selector: 'template-page',
  templateUrl: './template-page.component.html',
  styleUrls: [
    '../../shared/select-option.css',
    './template-page.component.css'
  ]
})


export class TemplatePageComponent {
  @Input() title: string;

  constructor() 
  {}
}
