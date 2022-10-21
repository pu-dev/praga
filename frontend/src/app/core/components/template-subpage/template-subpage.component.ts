import { Component, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'template-subpage',
  templateUrl: './template-subpage.component.html',
  styleUrls: ['./template-subpage.component.css']
})

export class TemplateSubpageComponent {
  constructor(
    public media: MediaMatcher
  ) 
  {}

  isMobile() {
    if (this.media.matchMedia('(max-width: 480px)').matches) {
      return true;
    }

    return false;
  }
}
