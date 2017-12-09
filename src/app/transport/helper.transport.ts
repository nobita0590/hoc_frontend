import { Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class HelperTransport {
  public static SERVER_URL = `http://localhost:8080`;
  public static API_ENDPOINT = `http://localhost:8080/api/`;
  public static api(url: string): string {
    return this.API_ENDPOINT + url;
  }
  public static objectToFormData(object: Object): any {
    const data = this.createUrlData(object);
    return data;
    // return data;
  }
  /*public static createUrlData(object: Object, form?: URLSearchParams, namespace?: string): URLSearchParams {
    const formData = form || new URLSearchParams();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
        this.createUrlData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }*/
  public static getHeader(): Headers {
    return new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Accept': '*/*',
      'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
    });
  }
  public static getLogedInHeader(): Headers {
    return new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Accept': '*/*',
      'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
  }
  public static getJsonHeader(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
  }
  public static handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    try {
      let _body = JSON.parse(error._body);
      error._body = _body
    } catch (e) {
      console.log(e);
    }
    return Promise.reject(error);
  }

  public static createUrlData(object: Object, form?: URLSearchParams, namespace?: string) {
    const formData = form || new URLSearchParams();
    for (const property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      let formKey = '';
      if (object.constructor.name === 'Array') {
        formKey = namespace ? `${namespace}[${property}]` : property;
      }else {
        formKey = namespace ? `${namespace}.${property}` : property;
      }
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
        this.createUrlData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }

  public static imageUrl(input: string): string {
    if (input.indexOf('http') == 0) {
      return input;
    } else if (input) {
      return `${this.SERVER_URL + input}`;
    }
    return '';
  }
}

export class Page {
  limit: number;
  offset: number;
  sortBy: string;
}
