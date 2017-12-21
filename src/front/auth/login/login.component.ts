import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../app/type/type';
import { FormErrorHelper, ValidateHelper } from '../../../app/shared/validate.helper';
import { UserTransport } from '../../../app/transport';
import { Router } from '@angular/router';
import { ChannelService } from '../../service';

declare var gapi: any;
@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  providers: [FacebookService]
})
export class LoginComponent {
  mainForm: FormGroup;
  gAuth2: any;
  constructor(private facebook: FacebookService,
              private fb: FormBuilder,
              private userTransport: UserTransport,
              private router: Router,
              private channelService: ChannelService) {
    this.mainForm = this.fb.group({
      UserName: ['', [Validators.required] ],
      Password: ['', [Validators.required] ],
    });
    const params: InitParams = {
      appId: '1192039274236789',
      version: 'v2.10'
    };
    this.facebook.init(params);
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    const user = this.mainForm.value as User;
    this.userTransport.login(user)
      .then(_d => {
        this.channelService.setUser(_d);
        this.router.navigate(['/trang-chu']);
      })
      .catch(err => {
        if (err.status === 400 && err._body && err._body.detail) {
          const detail = err._body.detail;
          FormErrorHelper.setServerError(this.mainForm , detail);
        }
      });
  }
  loginFacebook() {
    this.facebook.login()
      .then((response: LoginResponse) => {
        console.log('Logged in', response);
        if (response.status === 'connected') {
        }
        this.userTransport.loginFacebook(response.authResponse.userID, response.authResponse.accessToken)
          .then(_d => {
            if (_d.status) {
              console.log(_d);
              this.channelService.setUser(_d.data.user);
              this.router.navigate(['/trang-chu']);
            }
            console.log(_d);
          })
          .catch(e => {
            /*if (e.status == 400 && e._body && e._body.detail) {
              this.serverErr = e._body.detail;
            } else {
              this.serverErr = 'Lỗi Server. Vui lòng liên hệ ban quản trị!';
            }*/
          });
      })
      .catch(e => {
        console.log(e);
      });
  }
  loginGoogle() {
    gapi.load('auth2', () => {
      this.gAuth2 = gapi.auth2.init({
        client_id: '259270065865-lv5jv8l0ddas7c023b6o6jt2hemc9gcv.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
      });

      // Sign the user in, and then retrieve their ID.
      this.gAuth2.signIn().then(() => {
        console.log(this.gAuth2.currentUser.get());
      });
    });
  }
}
