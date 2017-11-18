import { Injectable } from '@angular/core';
import { TestsFrame, TestsFrameFilter } from './../type/type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class TestsFrameTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('question/tests/frame');
  constructor(private http: Http) { }
  getA(filter: TestsFrameFilter): Promise<TestsFrame> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as TestsFrame;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: TestsFrameFilter): Promise<{
    models: TestsFrame[],
    p_info: TestsFrameFilter
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
  insert(testFrame: TestsFrame): Promise<any> {
    let data = HelperTransport.objectToFormData(testFrame);
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
  update(testFrame: TestsFrame): Promise<any> {
    let data = HelperTransport.objectToFormData(testFrame);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as TestsFrame;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: TestsFrameFilter): Promise<number> {
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
