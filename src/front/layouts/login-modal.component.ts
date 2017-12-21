import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import set = Reflect.set;

@Component({
  selector: 'app-need-login',
  template: `
    <div class="modal-body">
      <h3 class="heading-form">Vui lòng đăng nhập</h3>
      <div class="wrapper-form">
        <p class="text-center">Để thực hiện chức năng này bạn cần đăng nhập</p>
        <div class="hrcontent">
          <span><i class="fa fa-user-circle"></i></span><hr>
        </div>
        <div class="form-group text-center">
          <a (click)="bsModalRef.hide()"
             [routerLink]="['/tai-khoan/dang-nhap']" class="btn btn-primary btn-p55 text-uppercase">Đăng nhập</a>
        </div>
      </div>
      <div class="text-center end-wrap-form">
        <p class=" m-10-0-0">Bạn chưa có tài khoản?
          <a (click)="bsModalRef.hide()" [routerLink]="['/tai-khoan/dang-ky']" class="btn-link">Đăng ký tại đây</a>
        </p>
        <p>Bạn quên mật khẩu?
          <a (click)="bsModalRef.hide()" [routerLink]="['/tai-khoan/quyen-mat-khau']" class="btn-link">Lấy lại tại đây</a>
        </p>
      </div>
    </div>
  `,
  providers: []
})
export class LoginModalComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef) {
  }
  ngOnInit(): void {
    setTimeout(() => {
    }, 100);
  }
}
