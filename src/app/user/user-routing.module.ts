import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Danh sách tài khoản'
    }
  }, {
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
