import { Injectable } from '@angular/core';
import { Exams } from './../type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class ExamsTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('front/exams');
  constructor(private http: Http) { }
  insertExams(exams: Exams): Promise<{number}> {
    const data = HelperTransport.objectToFormData(exams);
    const options: RequestOptionsArgs = {
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
}
