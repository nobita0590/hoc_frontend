import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

import { UserTransport } from '../../app/transport/transport';
import { User } from '../../app/type/type';
import { ChannelService, Helper } from '../service';

@Component({
  selector: 'body',
  templateUrl: './frondtend-layout.component.html',
  providers: [UserTransport, ChannelService, ToastyConfig]
})
export class FrondtendLayoutComponent implements OnInit {
  user: User = new User();
  search = '';
  isLogin = true;
  constructor(private router: Router,
              private title: Title,
              private userTransport: UserTransport,
              private channelService: ChannelService,
              private toastyService: ToastyService) {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.channelService.changeUser().subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.isLogin = true;
      this.user = user;
    });
    this.channelService.getFlashAlert().subscribe(alertInfo => {
      console.log(alertInfo);
      const toastOptions: ToastOptions = {
        title: alertInfo.title,
        msg: alertInfo.msg,
        showClose: true,
        timeout: 2500,
        theme: 'default'
      };
      switch (alertInfo.type) {
        case 'error':
          this.toastyService.error(toastOptions);
          break;
        case 'info':
          this.toastyService.info(toastOptions);
          break;
        case 'success':
          this.toastyService.success(toastOptions);
          break;
        case 'wait':
          this.toastyService.wait(toastOptions);
          break;
        case 'warning':
          this.toastyService.warning(toastOptions);
          break;
        default:
          this.toastyService.default(toastOptions);
      }
    });
  }

  ngOnInit(): void {
    this.isLogin = this.userTransport.checkLogin();
    this.title.setTitle('Học trực tuyến');
  }

  searchAll() {
    console.log(this.search);
    return;
  }
  logOut() {
    this.userTransport.logout();
    this.isLogin = false;
    this.router.navigate(['tai-khoan/dang-nhap']);
  }
  userAvatar(): string {
    return Helper.userAvatar(this.user.AvatarUrl);
  }
}
