import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { ItemModule } from '../item/item.module';
import { CommonHelperModule } from '../../app/common-helper.module';
import { FagsRoutingModule } from './fags-routing.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CKEditorModule,
    FormsModule,
    ItemModule,
    CommonHelperModule,
    FagsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    CreateComponent
  ],
})
export class FagsModule { }
