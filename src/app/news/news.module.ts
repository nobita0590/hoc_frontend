import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { NewsRoutingModule } from './news-routing.module';
import { CommonHelperModule } from './../common-helper.module';

import { DataTableModule } from 'angular-4-data-table/src/index';
import { BlockUIModule } from 'ng-block-ui';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";


@NgModule({
  imports: [
    CommonHelperModule,
    NewsRoutingModule,
    DataTableModule,
    BlockUIModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    CKEditorModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [CreateComponent, ListComponent]
})
export class NewsModule { }
