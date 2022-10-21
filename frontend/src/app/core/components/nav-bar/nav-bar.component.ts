import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NavItem } from '../../data-types/nav-item';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  navItems: NavItem[] = [];

  constructor(
    private backend: BackendService,
    private router: Router
  ) {
    this.fetchNavItems();
  }

  onClick(item: NavItem) {
    console.log(item)
  }

  private fetchNavItems() {
    let obs = this.backend.getNavItems();
    obs.valueChanges.subscribe((result: any) => {
      let data = result.data;
      this.navItems = data.navItems as NavItem[];
    });
  }
}
