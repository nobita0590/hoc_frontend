import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'Người dùng'
    },
    children: [
      {
        path: 'toi',
        component: ProfileComponent,
        data: {
          title: 'Thông tin tài khoản'
        }
      }, {
        path: 'sua',
        component: EditProfileComponent,
        data: {
          title: 'Sửa thông tin tài khoản'
        }
      }, {
        path: 'doi-mau-khau',
        component: ChangePasswordComponent,
        data: {
          title: 'Đổi mật khẩu'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
