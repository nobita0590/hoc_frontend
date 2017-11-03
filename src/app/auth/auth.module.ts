import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { UserTransport } from './../transport/user.transport';

import { CommonHelperModule } from './../common-helper.module';

@NgModule({
  imports: [
    CommonModule,
    CommonHelperModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [LoginComponent],
  providers: [UserTransport]
})
export class AuthModule { }
