import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BackendService } from '../../services/backend.service';

import { AuthService } from '../../services/auth.service';
import { NavItem } from '../../data-types/nav-item';


interface LinkDef {
  name: string;
  url: string;
};


@Component({
  selector: 'nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: [
    '../../shared/globals.css',
    './nav-bar-mobile.component.css'
  ]
})
export class NavBarMobileComponent implements AfterViewInit {

  navItems: NavItem[] = [];

  links: LinkDef[] = [
    {name: "Accounts",   url: "account"},
    {name: "Operations", url: "transaction"},
    {name: "Fintech",    url: "fintech"}
  ];

  private _mobileQueryListener: () => void;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private backend: BackendService,
    private router: Router
  ) {
    this.fetchNavItems();
  }

  ngAfterViewInit() {
    this.sidenav.autoFocus = false;
  }

  private fetchNavItems() {
    let obs = this.backend.getNavItems();
    obs.valueChanges.subscribe((result: any) => {
      let data = result.data;
      this.navItems = data.navItems as NavItem[];
    });
  }

}
