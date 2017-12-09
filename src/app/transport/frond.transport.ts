import { Injectable } from '@angular/core';
import { News, User, Course } from './../type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class FrondTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('front');
  constructor(private http: Http) { }
  getHomePage(): Promise<{
    news: News[],
    courses: Course[],
  }> {
    let options: RequestOptionsArgs = {
      headers : this.headers,
    };
    return this.http.get(`${this.apiUrl}/home` , options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  getNewsPage(): Promise<{
    news: News[]
  }> {
    let options: RequestOptionsArgs = {
      headers : this.headers,
    };
    return this.http.get(`${this.apiUrl}/news` , options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  updateUser(user: User): Promise<any> {
    const data = HelperTransport.objectToFormData(user);
    const options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(`${this.apiUrl}/user`, data , options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
}
