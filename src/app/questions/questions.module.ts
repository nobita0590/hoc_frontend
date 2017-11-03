import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { QuestionsRoutingModule } from './questions-routing.module';

import { CommonHelperModule } from './../common-helper.module';
import { DataTableModule } from 'angular-4-data-table/src/index';
import { BlockUIModule } from 'ng-block-ui';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonHelperModule,
    QuestionsRoutingModule,
    DataTableModule,
    BlockUIModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    CKEditorModule
  ],
  declarations: [CreateComponent, ListComponent]
})
export class QuestionsModule { }
