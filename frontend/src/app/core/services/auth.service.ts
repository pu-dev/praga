import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from './backend.service';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private backend: BackendService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string, url: String) {
    let obs = this.backend.getJwtToken(email, password);
    obs.subscribe(
      ({data}) => {
        const token = data.tokenAuth.token;
        this.storage.set('token', token);
        this.router.navigate([url]);
      },
      ({error}) => {
        console.error(`Auth problem: ${error}`);
      }
    );
  }

  logout() {
    let obs = this.backend.logoutUser();
    obs.valueChanges.subscribe((result: any) => {

        this.storage.remove('token');

        const data = result.data;
        console.log(data)
        // this.router.navigate([url]);
    });
  }

  isLogged(): boolean {
    const token = this.storage.get('token');
    if ( token != null && token !== "" ) {
      return true;
    }
    return false;
  }
}
