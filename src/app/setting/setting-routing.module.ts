import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
//import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'category',
    component: CategoryComponent,
    data: {
      title: 'Danh mục'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
