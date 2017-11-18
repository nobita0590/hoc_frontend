import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { TestComponent } from './test/test.component';
import { TestsFrameFormComponent } from './tests-frame/tests-frame-form.component';
import { TestsFrameComponent } from './tests-frame/tests-frame.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Danh sách'
    }
  }, {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Tạo câu hỏi'
    }
  }, {
    path: 'edit/:id',
    component: CreateComponent,
    data: {
      title: 'Sửa câu hỏi'
    }
  }, {
    path: 'test',
    component: TestComponent,
    data: {
      title: 'Đề thi'
    }
  }, {
    path: 'test/frame',
    component: TestsFrameComponent,
    data: {
      title: 'Mẫu đề'
    }
  }, {
    path: 'test/frame/create',
    component: TestsFrameFormComponent,
    data: {
      title: 'Tạo mẫu đề'
    }
  }, {
    path: 'test/frame/edit/:id',
    component: TestsFrameFormComponent,
    data: {
      title: 'Sửa mẫu đề'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
