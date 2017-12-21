import { Injectable } from '@angular/core';
import { Fags, FagsFilter, Page } from './../type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class FagsTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('front/fags');
  constructor(private http: Http) { }
  getA(filter: FagsFilter): Promise<Fags> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as Fags;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: FagsFilter): Promise<{
    models: Fags[],
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
  insert(fag: Fags): Promise<Fags> {
    fag.SubjectId = Math.floor(fag.SubjectId);
    fag.ClassId = Math.floor(fag.ClassId);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.post(this.apiUrl, fag, options)
      .toPromise()
      .then(res => {
        return res.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  update(fag: Fags): Promise<Fags> {
    fag.SubjectId = Math.floor(fag.SubjectId);
    fag.ClassId = Math.floor(fag.ClassId);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.put(this.apiUrl, fag, options)
      .toPromise()
      .then(res => {
        return res.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: FagsFilter): Promise<number> {
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
}
