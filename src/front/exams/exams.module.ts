import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CommonHelperModule } from '../../app/common-helper.module';
import { ExamsRoutingModule } from './exams-routing.module';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './fixed-list/list.component';
import { ExamComponent } from './exam/exam.component';
import { ExamContentComponent } from './exam/exam-content.component';

@NgModule({
  imports: [
    FormsModule,
    CommonHelperModule,
    ExamsRoutingModule,
    BlockUIModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [
    ListComponent, ExamComponent, ExamContentComponent
  ],
})
export class ExamsModule { }
