import { NgModule } from '@angular/core';
import { CommonHelperModule } from '../../app/common-helper.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule, AccordionModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';

import { CategoryComponent } from './category/category.component';
import { DetailComponent } from './detail/detail.component';

import { ItemModule } from '../item/item.module';
import { CourseRoutingModule } from './course-routing.module';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    CommonHelperModule,
    CourseRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    ItemModule,
    LaddaModule.forRoot({
      style: 'zoom-in',
      spinnerSize: 40,
      spinnerColor: '#795548',
      spinnerLines: 12
    })
  ],
  declarations: [
    CategoryComponent, DetailComponent
  ],
})
export class CourseModule { }
