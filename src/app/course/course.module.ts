import { NgModule } from '@angular/core';
import { CommonHelperModule } from './../common-helper.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { CourseRoutingModule } from './course-routing.module';

import { DataTableModule } from 'angular-4-data-table/src/index';
import { BlockUIModule } from 'ng-block-ui';
import { BsDropdownModule, TabsModule, AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageUploadModule } from 'angular2-image-upload';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonHelperModule,
    CourseRoutingModule,
    DataTableModule,
    BlockUIModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    CKEditorModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [ListComponent, FormComponent, ViewComponent]
})
export class CourseModule { }
