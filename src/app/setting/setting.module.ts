import { NgModule } from '@angular/core';
import { CommonHelperModule } from './../common-helper.module';
import { CategoryComponent } from './category/category.component';
import { SettingRoutingModule } from './setting-routing.module';
import { CategoryModalComponent } from './category/category-modal.component';

import { DataTableModule } from 'angular-4-data-table/src/index';
import { BlockUIModule } from 'ng-block-ui';
import { BsDropdownModule, TabsModule, ModalModule, SortableModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonHelperModule,
    SettingRoutingModule,
    DataTableModule,
    BlockUIModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    LaddaModule.forRoot({
      style: 'contract',
      spinnerSize: 40,
      spinnerColor: 'red',
      spinnerLines: 12
    })
  ],
  declarations: [CategoryComponent, CategoryModalComponent],
  entryComponents: [CategoryModalComponent]
})
export class SettingModule { }
