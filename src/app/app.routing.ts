import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { FullLayoutComponent } from './layouts/full-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/questions/test/frame/create',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: FullLayoutComponent,
    data: {
      title: 'Bảng điều khiển'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
        ,
        data: {
          title: 'Tài khoản'
        }
      }, {
        path: 'news',
        loadChildren: './news/news.module#NewsModule',
        data: {
          title: 'Tin tức'
        }
      }, {
        path: 'document',
        loadChildren: './document/document.module#DocumentModule',
        data: {
          title: 'Tài liệu'
        }
      }, {
        path: 'setting',
        loadChildren: './setting/setting.module#SettingModule',
        data: {
          title: 'Cấu hình'
        }
      }, {
        path: 'questions',
        loadChildren: './questions/questions.module#QuestionsModule',
        data: {
          title: 'Ngân hàng câu hỏi'
        }
      }, {
        path: 'course',
        loadChildren: './course/course.module#CourseModule',
        data: {
          title: 'Khóa học'
        }
      },
    ]
  },
  {
    path: 'auth',
    component: SimpleLayoutComponent,
    data: {
      title: 'Auth'
    },
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
