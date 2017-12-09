import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CommonHelperModule } from '../../app/common-helper.module';

// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    FormsModule,
    CommonHelperModule,
    UserRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
})
export class UsersModule { }
