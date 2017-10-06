import { Page, Model } from './app.type';
export class User extends Model {
  UserName: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  AvatarUrl: string;
  Phone: string;
  Class: string;
  School: string;
  Birthday: string;
  CreatorId: Date;
  getAvatarUrl(): string {
    if (this.AvatarUrl) {
      return this.AvatarUrl;
    }
    return 'http://localhost:8080/public/img/default_user.png';
  }
}

export class UserFilter extends Page {
  ID:  number;
}

export class UserConfig {
  static AccessKeyName = 'access_token';
}
