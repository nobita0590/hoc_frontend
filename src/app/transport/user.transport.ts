import { Injectable } from '@angular/core';
import { User, UserFilter, UserConfig } from './../type/user-type';
import { Http, RequestOptionsArgs } from '@angular/http';
import { HelperTransport } from './helper.transport';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserTransport {
  private headers = HelperTransport.getLogedInHeader();
  private userApi = HelperTransport.api('user');
  accessKeyName = 'access_token';
  constructor(private http: Http) { }
  login(user: User): Promise<any> {
    let data = HelperTransport.objectToFormData(user);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getHeader(),
    };
    return this.http.post(HelperTransport.api(`auth/login`), data, options)
      .toPromise()
      .then(response => {
        let _d = response.json();
        if (_d.status) {
          localStorage.setItem(UserConfig.AccessKeyName, _d.data.access_token);
          localStorage.setItem('user', JSON.stringify(_d.data.user));
        }
        return _d;
      })
      .catch(HelperTransport.handleError);
  }
  loginFacebook(id: string,token: string): Promise<any> {
    let data = HelperTransport.objectToFormData({
      id: id,
      access_token: token
    });
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getHeader(),
    };
    return this.http.post(HelperTransport.api(`auth/login/facebook`), data, options)
      .toPromise()
      .then(response => {
        let _d = response.json();
        if (_d.status) {
          localStorage.setItem(UserConfig.AccessKeyName, _d.data.access_token);
          localStorage.setItem('user', JSON.stringify(_d.data.user));
        }
        return _d;
      })
      .catch(HelperTransport.handleError);
  }
  checkLogin(): boolean {
    let accessKey = localStorage.getItem(this.accessKeyName);
    //console.log(accessKey)
    if (accessKey && accessKey !== 'undefined') {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem(this.accessKeyName);
  }
  getA(filter: UserFilter): Promise<User> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.userApi , options)
      .toPromise()
      .then(response => {
        return response.json().data as User;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: UserFilter): Promise<{
    user: User[],
    p_info: UserFilter
  }> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    //console.log(this.headers);
    return this.http.get(this.userApi + '/list', options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  insert(user: User): Promise<any> {
    let data = HelperTransport.objectToFormData(user);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : this.headers,
    };
    return this.http.post(this.userApi, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as User;
      })
      .catch(HelperTransport.handleError);
  }
  update(user: User): Promise<any> {
    let data = HelperTransport.objectToFormData(user);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.userApi, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as User;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: UserFilter): Promise<number> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.delete(this.userApi, options)
      .toPromise()
      .then(response => {
        return response.json().data as number;
      })
      .catch(HelperTransport.handleError);
  }
}
