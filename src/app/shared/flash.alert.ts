import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class FlashAlert {
  public static AlertDefault = 'default';
  public static AlertInfo = 'info';
  public static AlertSuccess = 'success';
  public static AlertWait = 'wait';
  public static AlertError = 'error';
  public static AlertWarning = 'warning';
  public static StoreKey = 'flash';

  private subject = new Subject<any>();

  flashAlert(typeAlert: string, title: string, msg: string) {
    this.subject.next({
      type: typeAlert,
      title: title,
      msg: msg
    });
    // localStorage.setItem(this.StoreKey, JSON.stringify(message));
  }
  getFlashAlert(): Observable<any> {
    return this.subject.asObservable();
  }
}

class FlashInfo {
  status: boolean;
  type: string;
  title: string;
  msg: string;
}
