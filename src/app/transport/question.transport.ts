import { Injectable } from '@angular/core';
import { Question, QuestionFilter } from './../type/questions-type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class QuestionTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('question');
  constructor(private http: Http) { }
  getA(filter: QuestionFilter): Promise<Question> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as Question;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: QuestionFilter): Promise<{
    models: Question[],
    p_info: QuestionFilter
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
  insert(question: Question): Promise<any> {
    // let data = HelperTransport.objectToFormData(question);
    question.CategoryId = Math.floor(question.CategoryId);
    question.SubjectId = Math.floor(question.SubjectId);
    question.ClassId = Math.floor(question.ClassId);
    question.DifficultId = Math.floor(question.DifficultId);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.post(this.apiUrl, question, options)
      .toPromise()
      .then(res => {
        return res.json().data as number;
      })
      .catch(HelperTransport.handleError);
  }
  update(question: Question): Promise<any> {
    // console.log(question)
    // let data = HelperTransport.objectToFormData(question);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.put(this.apiUrl, question, options)
      .toPromise()
      .then(res => {
        return res.json().data as Question;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: QuestionFilter): Promise<number> {
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
