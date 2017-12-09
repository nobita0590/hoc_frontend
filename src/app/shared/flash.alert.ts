import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FlashAlert {
  public static AlertDefault = 'default';
  public static AlertInfo = 'info';
  public static AlertSuccess = 'success';
  public static AlertWait = 'wait';
  public static AlertError = 'error';
  public static AlertWarning = 'warning';
  public static StoreKey = 'flash';

  static VNToId(str: string): string {
    return str.toLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, '-')
      .replace(/-+-/g, '-') /*thay thế 2- thành 1-*/
      .replace(/^\-+|\-+$/g, ''); /*cắt bỏ ký tự - ở đầu và cuối chuỗi*/
  }

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
