export class FlashAlert {
  public static AlertDefault = 'default';
  public static AlertInfo = 'info';
  public static AlertSuccess = 'success';
  public static AlertWait = 'wait';
  public static AlertError = 'error';
  public static AlertWarning = 'warning';
  public static StoreKey = 'flash';

  static flashAlert(typeAlert: string, title: string, msg: string) {
    let message = {
      type: typeAlert,
      title: title,
      msg: msg
    };
    localStorage.setItem(this.StoreKey, JSON.stringify(message));
  }
  static checkFlash(): FlashInfo {
    var flashInfo = new FlashInfo();
    flashInfo.status = true;
    var alert = JSON.parse(localStorage.getItem(this.StoreKey));
    if (alert && alert.title) {
      flashInfo.title = alert.title;
      flashInfo.msg = alert.msg;
      flashInfo.type = this.AlertDefault;
      if ([this.AlertError, this.AlertInfo, this.AlertSuccess, this.AlertWait, this.AlertWarning].indexOf(alert.type)) {
        flashInfo.type = alert.type;
      }
    }
    return flashInfo;
  }
}

class FlashInfo {
  status: boolean;
  type: string;
  title: string;
  msg: string;
}
