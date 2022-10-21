import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.auth.logout();
    this.router.navigate(['guest/main']);
  }

  onLogin() {
    this.router.navigate(['user/login']);
  }

  onSignup() {
    this.router.navigate(['user/create']);
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }
}
