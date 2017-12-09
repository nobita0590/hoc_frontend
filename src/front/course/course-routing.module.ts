import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Khóa học'
    }
  }, {
    path: ':url/:id',
    component: DetailComponent,
    data: {
      title: 'Khóa học'
    }
  },
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
export class CourseRoutingModule {}
