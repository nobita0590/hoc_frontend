import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './fixed-list/list.component';
import { ExamComponent } from './exam/exam.component';
import { GenerateComponent } from './generate/generate.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Danh sách đề thi'
    }
  }, {
    path: ':url/:id',
    component: ExamComponent,
    data: {
      title: 'Thi'
    }
  }, {
    path: 'tao-de',
    component: GenerateComponent,
    data: {
      title: 'Tạo đề ngẫu nhiên'
    }
  }
  /*, {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Tạo tài khoản'
    }
  }, {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: 'Sửa thông tin tài khoản'
    }
  }, {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: 'Thông tin tài khoản'
    }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule {}
