import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTransport, HelperTransport } from './../transport';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { FlashAlert } from './../shared/flash.alert';
import { User } from './../type/user-type';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styles: [`
  .simple-dropdown{
    z-index: 9999 !important;
  }
  `],
  providers: [UserTransport, ToastyConfig]
})
export class FullLayoutComponent implements AfterViewInit {
  user: User = new User();
  subscription: Subscription;
  constructor(private userTransport: UserTransport, private route: Router,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig,
              private flashAlert: FlashAlert) {
    if (!this.userTransport.checkLogin()) {
      this.route.navigate(['/auth/login']);
    }
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    if (!this.user || !this.user.IsAdmin) {
      location.href = '/trang-chu';
    }
    this.subscription = this.flashAlert.getFlashAlert().subscribe(alertInfo => {
      console.log(alertInfo);
      //if (alertInfo.status ) {
        // var self = this;
        var toastOptions: ToastOptions = {
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

      //}
    });
  }

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  public logout(): void {
    this.userTransport.logout();
    this.route.navigate(['/auth/login']);
  }

  ngAfterViewInit(): void {
  }
  userAvatar(): string {
    if (this.user.AvatarUrl) {
      return this.user.AvatarUrl;
    }
    return HelperTransport.imageUrl('/public/img/default_user.png');
  }
}
