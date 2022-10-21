import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../core/shared/shared.module';

import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-singup/user-signup.component';

import { ViewUserLoginComponent } from './views/view-user-login/view-user-login.component';
import { ViewUserSignupComponent } from './views/view-user-signup/view-user-signup.component';

// import { TemplatePageComponent } from '../../core/components/template-page/template-page.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignupComponent,

    ViewUserLoginComponent,
    ViewUserSignupComponent,
// TemplatePageComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
