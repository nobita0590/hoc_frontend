import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Danh sách tài liệu'
    }
  }, {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Tạo tài liệu'
    }
  }, {
    path: 'edit/:id',
    component: CreateComponent,
    data: {
      title: 'Sửa tài liệu'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {}
