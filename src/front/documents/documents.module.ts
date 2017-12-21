import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CommonHelperModule } from '../../app/common-helper.module';
import { FormsModule } from '@angular/forms';
import { ItemModule } from '../item/item.module';
import { DocumentsRoutingModule } from './documents-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { TopUserComponent } from './top-user.component';

@NgModule({
  imports: [
    ItemModule,
    FormsModule,
    CommonHelperModule,
    DocumentsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    TopUserComponent
  ],
})
export class DocumentsModule { }
