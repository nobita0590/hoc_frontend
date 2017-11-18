import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { CategoryComponent } from './category/category.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    data: {
      title: 'Tin tức'
    },
    // redirectTo: 'danh-muc',
    children: [
      {
        path: 'thong-tin-tuyen-sinh',
        component: CategoryComponent,
        data: {
          title: 'Thông tin tuyển sinh',
          categoryId: 1,
        }
      }, {
        path: 'bi-quyet-hoc-thi',
        component: CategoryComponent,
        data: {
          title: 'Bí quyết học thi',
          categoryId: 2,
        }
      }, {
        path: 'danh-muc',
        component: CategoryComponent,
        data: {
          title: 'Danh mục tin tức'
        }
      }, {
        path: 'chi-tiet',
        component: DetailComponent,
        data: {
          title: 'Chi tiết'
        }
      }, {
        path: 'chi-tiet/:id',
        component: DetailComponent,
        data: {
          title: 'Chi tiết'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
