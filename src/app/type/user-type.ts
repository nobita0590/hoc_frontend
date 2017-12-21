import { Page, Model } from './app.type';
export class User extends Model {
  UserName: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  AvatarUrl: string;
  CorverUrl: string;
  Phone: string;
  Class: string;
  School: string;
  Birthday: string;
  Gender: number;
  CreatorId: number;
  Description: string;
  ProvinceId: number;
  ExamsNumber: number;
  TestedNumber: number;
  LessonsLearnedNumber: number;
  SocialId: string;
  ActivityNumber: number;
  IsAdmin: boolean;
}

export class UserFilter extends Page {
  ID:  number;
}

export class UserConfig {
  static AccessKeyName = 'access_token';
}
