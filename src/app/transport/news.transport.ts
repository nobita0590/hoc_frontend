import { Injectable } from '@angular/core';
import { News, NewsFilter } from './../type/news-type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class NewsTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('news');
  constructor(private http: Http) { }
  getA(filter: NewsFilter): Promise<News> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as News;
      })
      .catch(HelperTransport.handleError);
  }
  detailNews(filter: NewsFilter): Promise<{
    news: News,
    relate: News[]
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
          news: News,
          relate: News[]
        };
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: NewsFilter): Promise<{
    models: News[],
    p_info: NewsFilter
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
  insert(news: News): Promise<any> {
    let data = HelperTransport.objectToFormData(news);
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
  update(news: News): Promise<any> {
    let data = HelperTransport.objectToFormData(news);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as News;
      })
      .catch(HelperTransport.handleError);
  }
  delete(filter: NewsFilter): Promise<number> {
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
