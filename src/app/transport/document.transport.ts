import { Injectable } from '@angular/core';
import { Documents, DocumentFilter } from './../type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class DocumentTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('document');
  constructor(private http: Http) { }
  getA(filter: DocumentFilter): Promise<Documents> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as Documents;
      })
      .catch(HelperTransport.handleError);
  }
  getFront(filter: DocumentFilter): Promise<Documents> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl + '/front' , options)
      .toPromise()
      .then(response => {
        return response.json().data as Documents;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: DocumentFilter): Promise<{
    models: Documents[],
    p_info: DocumentFilter
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
  insert(doc: Documents): Promise<any> {
    let data = HelperTransport.objectToFormData(doc);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : this.headers,
    };
    return this.http.post(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as number;
      })
      .catch(HelperTransport.handleError);
  }
  update(doc: Documents): Promise<any> {
    let data = HelperTransport.objectToFormData(doc);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as Documents;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: DocumentFilter): Promise<number> {
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
