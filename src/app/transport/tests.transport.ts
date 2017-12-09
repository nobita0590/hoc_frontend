import { Injectable } from '@angular/core';
import { Tests, Exams, TestsFilter } from './../type/type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class TestsTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('question/tests');
  constructor(private http: Http) { }
  getA(filter: TestsFilter): Promise<Tests> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as Tests;
      })
      .catch(HelperTransport.handleError);
  }
  getForExams(filter: TestsFilter): Promise<{
    test: Tests,
    exams: Exams[]
  }> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(`${this.apiUrl}/exams` , options)
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: TestsFilter): Promise<{
    models: Tests[],
    p_info: TestsFilter
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
  insert(test: Tests): Promise<any> {
    let data = HelperTransport.objectToFormData(test);
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
  update(question: Tests): Promise<any> {
    console.log(question)
    let data = HelperTransport.objectToFormData(question);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as Tests;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: TestsFilter): Promise<number> {
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
