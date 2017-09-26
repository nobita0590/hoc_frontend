import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class HelperTransport {
  public static API_ENDPOINT = `http://localhost:8080/`;
  public static api(url: string): string {
    return this.API_ENDPOINT + url;
  }
  public static objectToFormData(object: Object): string {
    let data = this.createUrlData(object);
    return data.toString();
  }
  public static createUrlData(object: Object, form?: URLSearchParams, namespace?: string): URLSearchParams {
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
  }
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
}

export class Page {
  limit: number;
  offset: number;
  sortBy: string;
}
