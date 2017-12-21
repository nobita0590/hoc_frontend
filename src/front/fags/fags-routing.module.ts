import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { FagsComponent } from './main/fags.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: FagsComponent,
    data: {
      title: 'câu hỏi'
    }
  }, {
    path: 'tao-cau-hoi',
    component: CreateComponent,
    data: {
      title: 'Tạo câu hỏi'
    }
  }, {
    path: ':url/:id',
    component: DetailComponent,
    data: {
      title: 'Chi tiet'
    }
  }
  /*, {
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
