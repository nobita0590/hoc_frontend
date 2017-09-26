import { Page, Model } from './app.type';
export class User extends Model {
  UserName: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Birthday: string;
  CreatorId: number;
}

export class UserFilter extends Page {
  ID:  number;
}
