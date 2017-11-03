import { Injectable } from '@angular/core';
import { SelectSource, SelectSourceFilter } from './../type/setting-type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class SelectSourceTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('config/select');
  constructor(private http: Http) { }
  getA(filter: SelectSourceFilter): Promise<SelectSource> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as SelectSource;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: SelectSourceFilter): Promise<SelectSource[]> {
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
  getGroup(filter: SelectSourceFilter): Promise<SelectSource[][]> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    // console.log(this.headers);
    return this.http.get(this.apiUrl + '/group', options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  insert(model: SelectSource): Promise<any> {
    let data = HelperTransport.objectToFormData(model);
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
  update(model: SelectSource): Promise<any> {
    let data = HelperTransport.objectToFormData(model);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as number;
      })
      .catch(HelperTransport.handleError);
  }
  updateSort(sorts: any): Promise<boolean> {
    let data = HelperTransport.objectToFormData(sorts);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl + '/order', data, options)
      .toPromise()
      .then(res => {
        return res.json().data as boolean;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: SelectSourceFilter): Promise<number> {
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
