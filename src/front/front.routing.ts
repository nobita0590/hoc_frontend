import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'trang-chu',
    pathMatch: 'full',
  },
  {
    path: 'trang-chu',
    component: HomeComponent,
    data: {
      title: 'Trang chủ'
    }
  }, {
    path: 'nguoi-dung',
    loadChildren: './users/users.module#UsersModule'
    /*component: UserComponent,
    data: {
      title: 'Người dùng'
    }*/
  }, {
    path: 'tai-khoan',
    loadChildren: './auth/auth.module#AuthModule'
  }, {
    path: 'tin-tuc',
    loadChildren: './news/news.module#NewsModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class FrontRoutingModule {}
