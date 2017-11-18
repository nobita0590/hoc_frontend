import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CommonHelperModule } from '../../app/common-helper.module';

// import { ShowErrorsComponent } from './../shared/show-errors.component';
import { NewsRoutingModule } from './news-routing.module';

import { NewsComponent } from './news.component';
import { CategoryComponent } from './category/category.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  imports: [
    CommonHelperModule,
    NewsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    NewsComponent,
    CategoryComponent,
    DetailComponent
  ],
})
export class NewsModule { }
