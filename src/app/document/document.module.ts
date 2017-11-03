import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DocumentRoutingModule } from './document-routing.module';

import { DataTableModule } from 'angular-4-data-table/src/index';
import { BlockUIModule } from 'ng-block-ui';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CommonHelperModule } from './../common-helper.module';
// import { ImageUploadModule } from "angular2-image-upload";
import { UploadDocumentComponent } from './upload-document.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonHelperModule,
    DocumentRoutingModule,
    DataTableModule,
    BlockUIModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    // ImageUploadModule.forRoot(),
    FileUploadModule,
  ],
  declarations: [CreateComponent, ListComponent, UploadDocumentComponent],
  exports: [UploadDocumentComponent]
})
export class DocumentModule { }
