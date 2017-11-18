import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../app/type';

@Injectable()
export class ChannelService {
  public static AlertDefault = 'default';
  public static AlertInfo = 'info';
  public static AlertSuccess = 'success';
  public static AlertWait = 'wait';
  public static AlertError = 'error';
  public static AlertWarning = 'warning';
  public static StoreKey = 'flash';

  private flashSubject = new Subject<any>();
  private userSubject = new Subject<any>();

  flashAlert(typeAlert: string, title: string, msg: string) {
    this.flashSubject.next({
      type: typeAlert,
      title: title,
      msg: msg
    });
    // localStorage.setItem(this.StoreKey, JSON.stringify(message));
  }
  getFlashAlert(): Observable<any> {
    return this.flashSubject.asObservable();
  }
  setUser(user: User) {
    this.userSubject.next(user);
  }
  changeUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
}
