import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewUserLoginComponent } from './views/view-user-login/view-user-login.component';
import { ViewUserSignupComponent } from './views/view-user-signup/view-user-signup.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: ViewUserLoginComponent 
  },
  {
    path: 'singup',
    component: ViewUserSignupComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {}
