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
  ProvinceId: number;
  SocialId: string;
  Gender: number;
}

export class UserFilter extends Page {
  ID:  number;
}

export class UserConfig {
  static AccessKeyName = 'access_token';
}
