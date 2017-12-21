import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CommonHelperModule } from '../../app/common-helper.module';
import { ExamsRoutingModule } from './exams-routing.module';
import { FormsModule } from '@angular/forms';
import { ItemModule } from '../item/item.module';

import { ListComponent } from './fixed-list/list.component';
import { ExamComponent } from './exam/exam.component';
import { ExamContentComponent } from './exam/exam-content.component';
import { GenerateComponent } from './generate/generate.component';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    ItemModule,
    FormsModule,
    CommonHelperModule,
    ExamsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    LaddaModule.forRoot({
      style: 'zoom-in',
      spinnerSize: 40,
      spinnerColor: '#795548',
      spinnerLines: 12
    })
  ],
  declarations: [
    ListComponent, ExamComponent, ExamContentComponent, GenerateComponent
  ],
})
export class ExamsModule { }
