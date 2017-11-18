import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { FormsModule } from '@angular/forms';

import { CommonHelperModule } from '../../app/common-helper.module';
// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { UserRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
  imports: [
    CommonHelperModule,
    FormsModule,
    UserRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotComponent
  ],
})
export class AuthModule { }
