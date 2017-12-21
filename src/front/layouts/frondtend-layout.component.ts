import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserTransport } from '../../app/transport/transport';
import { User } from '../../app/type/type';
import { ChannelService, Helper } from '../service';
import { LoginModalComponent } from './login-modal.component';

@Component({
  selector: 'body',
  templateUrl: './frondtend-layout.component.html',
  providers: [UserTransport, ChannelService, ToastyConfig]
})
export class FrondtendLayoutComponent implements OnInit {
  isShowNav = false;
  user: User = new User();
  search = '';
  isLogin = true;
  bsModalRef: BsModalRef;
  constructor(private router: Router,
              private title: Title,
              private userTransport: UserTransport,
              private channelService: ChannelService,
              private toastyService: ToastyService,
              private modalService: BsModalService) {
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
    this.channelService.loginCalled().subscribe(bool => {
      console.log('open popup to login: ', bool);
      this.bsModalRef = this.modalService.show(LoginModalComponent, {});
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
