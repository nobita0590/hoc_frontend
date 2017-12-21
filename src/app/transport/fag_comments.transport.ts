import { Injectable } from '@angular/core';
import { FagComments, FagCommentsFilter, Page } from './../type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class FagCommentsTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('front/fags/comments');
  constructor(private http: Http) { }
  getA(filter: FagCommentsFilter): Promise<FagComments> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: FagCommentsFilter): Promise<{
    models: FagComments[],
    p_info: Page
  }> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    // console.log(this.headers);
    return this.http.get(this.apiUrl + '/list', options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  insert(comment: FagComments): Promise<FagComments> {
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.post(this.apiUrl, comment, options)
      .toPromise()
      .then(res => {
        return res.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  update(comment: FagComments): Promise<FagComments> {
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.put(this.apiUrl, comment, options)
      .toPromise()
      .then(res => {
        return res.json().data as FagComments;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: FagCommentsFilter): Promise<number> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.delete(this.apiUrl, options)
      .toPromise()
      .then(response => {
        return response.json().data as number;
      })
      .catch(HelperTransport.handleError);
  }
  vote(filter: FagCommentsFilter): Promise<FagComments> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : this.headers,
    };
    return this.http.post(this.apiUrl + '/vote', data, options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  trust(filter: FagCommentsFilter): Promise<boolean> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : this.headers,
    };
    return this.http.post(this.apiUrl + '/trust', data, options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
}
