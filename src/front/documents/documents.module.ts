import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';


// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { DocumentsRoutingModule } from './documents-routing.module';


@NgModule({
  imports: [
    DocumentsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
  ],
})
export class NewsModule { }
