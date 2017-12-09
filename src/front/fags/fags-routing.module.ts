import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'tao-cau-hoi',
    component: CreateComponent,
    data: {
      title: 'Tạo câu hỏi'
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
export class FagsRoutingModule {}
