import { Component } from '@angular/core';
import { Helper } from '../service';
import { User } from '../../app/type';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './user.component.html'
})
export class UserComponent {
  user: User = new User();
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }
  viewDate() {
    return Helper.viewDate(new Date(this.user.CreatedAt));
  }
  avatar() {
    return Helper.userAvatar(this.user.AvatarUrl);
  }
}
