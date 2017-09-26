import { Injectable } from '@angular/core';
import { User, UserFilter } from './../type/user-type';
import { Http, RequestOptionsArgs } from '@angular/http';
import { HelperTransport } from './helper.transport';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserTransport {
  private headers = HelperTransport.getLogedInHeader();
  constructor(private http: Http) { }
  login(user: User): Promise<any> {
    let data = HelperTransport.objectToFormData(user);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getHeader(),
    };
    return this.http.post(HelperTransport.api(`auth/login`),data, options)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(HelperTransport.handleError);
  }
  getUsers(filter: UserFilter): Promise<User[]> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : this.headers,
    };
    return this.http.post(HelperTransport.api(`auth/login`),data, options)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(HelperTransport.handleError);
  }
}
