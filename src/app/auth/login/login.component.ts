import { Component, OnInit } from '@angular/core';
import { UserTransport } from './../../transport/user.transport';
import { User, UserConfig } from './../../type/user-type';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserTransport, FacebookService]

})
export class LoginComponent implements OnInit {

  credential: User = <User>{
    UserName: '',
    Password: ''
  };
  serverErr = '';

  constructor(private userTransport: UserTransport,
              private route: Router,
              private fb: FacebookService) {
    const params: InitParams = {
      appId: '1192039274236789',
      version: 'v2.10'
    };

    fb.init(params);
  }

  ngOnInit() {
  }
  login(loginForm) {
    this.serverErr = '';
    if (loginForm.invalid) {
      return;
    }
    this.userTransport.login(this.credential)
      .then(_d => {
        if (_d.status) {
          this.route.navigate(['/admin']);
        }
      })
      .catch(e => {
        if (e.status == 400 && e._body && e._body.detail) {
          this.serverErr = e._body.detail;
        } else {
          this.serverErr = 'Lỗi Server. Vui lòng liên hệ ban quản trị!';
        }
      });
  }
  log(model) {
    this.serverErr = '';
    // console.log(model);
    // eval('window.model = model');
  }
  loginFacebook() {
    this.fb.login()
      .then((response: LoginResponse) => {
        console.log('Logged in', response);
        if (response.status === 'connected') {
        }
        this.userTransport.loginFacebook(response.authResponse.userID, response.authResponse.accessToken)
          .then(_d => {
            if (_d.status) {
              this.route.navigate(['/admin']);
            }
            console.log(_d);
          })
          .catch(e => {
            if (e.status == 400 && e._body && e._body.detail) {
              this.serverErr = e._body.detail;
            } else {
              this.serverErr = 'Lỗi Server. Vui lòng liên hệ ban quản trị!';
            }
          });
      })
      .catch(e => console.error('Error logging in'));

  }
  loginGoogle() {
    console.log('login google');
  }
}
