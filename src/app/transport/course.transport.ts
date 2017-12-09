import { Injectable } from '@angular/core';
import { Course, CourseFilter, Page } from './../type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class CourseTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('course');
  constructor(private http: Http) { }
  getA(filter: CourseFilter): Promise<Course> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as Course;
      })
      .catch(HelperTransport.handleError);
  }
  detailCourse(filter: CourseFilter): Promise<{
    course: Course,
    relate: Course[]
  }> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(`${this.apiUrl}/detail` , options)
      .toPromise()
      .then(response => {
        return response.json().data as {
          news: Course,
          relate: Course[]
        };
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: CourseFilter): Promise<{
    models: Course[],
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
  insert(course: Course): Promise<any> {
    // let data = HelperTransport.objectToFormData(news);
    let options: RequestOptionsArgs = {
      method : 'post',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.post(this.apiUrl, course, options)
      .toPromise()
      .then(res => {
        return res.json().data as number;
      })
      .catch(HelperTransport.handleError);
  }
  update(course: Course): Promise<any> {
    // let data = HelperTransport.objectToFormData(news);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : HelperTransport.getJsonHeader(),
    };
    return this.http.put(this.apiUrl, course, options)
      .toPromise()
      .then(res => {
        return res.json().data as Course;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: CourseFilter): Promise<number> {
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
