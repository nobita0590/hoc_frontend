import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dang-ky',
    pathMatch: 'full',
  }, {
    path: 'dang-ky',
    component: RegisterComponent,
    data: {
      title: 'Đăng ký tài khoản'
    }
  }, {
    path: 'dang-nhap',
    component: LoginComponent,
    data: {
      title: 'Đăng nhập'
    }
  }, {
    path: 'quyen-mat-khau',
    component: ForgotComponent,
    data: {
      title: 'Quyên mật khẩu'
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
export class UserRoutingModule {}
