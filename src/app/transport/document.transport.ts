import { Injectable } from '@angular/core';
import { Document, DocumentFilter } from './../type/document-type';
import { HelperTransport } from './helper.transport';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class DocumentTransport {
  private headers = HelperTransport.getLogedInHeader();
  private apiUrl = HelperTransport.api('document');
  constructor(private http: Http) { }
  getA(filter: DocumentFilter): Promise<Document> {
    let data = HelperTransport.objectToFormData(filter);
    let options: RequestOptionsArgs = {
      headers : this.headers,
      body : data,
      search: data
    };
    return this.http.get(this.apiUrl , options)
      .toPromise()
      .then(response => {
        return response.json().data as Document;
      })
      .catch(HelperTransport.handleError);
  }
  getList(filter: DocumentFilter): Promise<{
    models: Document[],
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
  insert(document: Document): Promise<any> {
    let data = HelperTransport.objectToFormData(document);
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
  update(document: Document): Promise<any> {
    let data = HelperTransport.objectToFormData(document);
    let options: RequestOptionsArgs = {
      method : 'put',
      headers : this.headers,
    };
    return this.http.put(this.apiUrl, data, options)
      .toPromise()
      .then(res => {
        return res.json().data as Document;
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
