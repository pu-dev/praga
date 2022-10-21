import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RiChee';
  name = 'Angular ' + VERSION.major;

  constructor(
    private router: Router,
    public media: MediaMatcher,
  ) 
  {
    console.log(`Running on: Angular.${VERSION.major}`);
  }

  ngOnInit(): void {
    this.router.navigate(['main']);

  }

  isMobile() {
    if (this.media.matchMedia('(max-width: 480px)').matches) {
      return true;
    }
    return false;
  }

      

}
