import { HelperTransport } from '../../app/transport';
import { User } from '../../app/type';
export class Helper {
  static viewDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
  static viewDateTime(date: Date): string {
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
  static getCkPublicConfig() {
    return {
      toolbarGroups : [
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others', groups: [ 'others' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'about', groups: [ 'about' ] }
      ],
      removeButtons : 'Underline,Subscript,Superscript,Source,About,Image,Undo,Redo,Anchor'
    };
  }
  static getUserInfo(): User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }
}
