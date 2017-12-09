import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { DataTableModule } from 'angular-4-data-table/src/index';
import { BlockUIModule } from 'ng-block-ui';
import { ImageUploadModule } from "angular2-image-upload";


import { ReactiveFormsModule } from '@angular/forms';
// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { EditComponent } from './edit/edit.component';

import { CommonHelperModule } from './../common-helper.module';

@NgModule({
  imports: [
    UserRoutingModule,
    CommonHelperModule,
    DataTableModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  declarations: [
    CreateComponent,
    ViewComponent,
    ListComponent,
    EditComponent
  ],
})
export class UserModule { }
