import { HelperTransport } from '../../app/transport';
export class Helper {
  static viewDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
  static viewDateTime(date: Date): string {
    console.log(date);
    return `${this.viewDate(date)} ${date.getHours()}:${date.getMinutes()}`;
  }
  static viewNumber(input: number): string {
    return input.toString();
  }
  static userAvatar(avatar): string {
    if (avatar) {
      if (avatar.indexOf('http') !== -1) {
        return avatar;
      }
      return HelperTransport.SERVER_URL + avatar;
    }
    return HelperTransport.SERVER_URL + '/public/img/default_user.png';
  }
}
