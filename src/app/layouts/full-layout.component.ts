import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTransport } from './../transport/user.transport';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { FlashAlert } from './../shared/flash.alert';
import { User } from './../type/user-type';

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
  constructor(private userTransport: UserTransport, private route: Router,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    if (!this.userTransport.checkLogin()) {
      this.route.navigate(['/auth/login']);
    }
    this.user = JSON.parse(localStorage.getItem('user')) as User;
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
    this.flashAlert();
  }
  flashAlert() {

    var alertInfo = FlashAlert.checkFlash();
    //console.log(alertInfo)
    /*if (alertInfo.status ) {
      var self = this;
      var toastOptions: ToastOptions = {
        title: alertInfo.title,
        msg: alertInfo.msg,
        showClose: true,
        timeout: 2500,
        theme: 'default'
        /!*onAdd: (toast: ToastData) => {
          console.log('Toast ' + toast.id + ' has been added!');
        },[alertInfo.type]
        onRemove: function(toast:ToastData) {
          console.log('Toast ' + toast.id + ' has been removed!');
        }*!/
      };
      self.toastyService.success(toastOptions);
    }*/


  }
  userAvatar(): string {
    if (this.user.AvatarUrl) {
      return this.user.AvatarUrl;
    }
    return 'http://localhost:8080/public/img/default_user.png';
  }
}
