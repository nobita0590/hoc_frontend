import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Danh sách khóa học'
    }
  }, {
    path: 'create',
    component: FormComponent,
    data: {
      title: 'Tạo khóa học'
    }
  }, {
    path: 'edit/:id',
    component: FormComponent,
    data: {
      title: 'Sửa khóa học'
    }
  }, {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: 'Xem khóa học'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
